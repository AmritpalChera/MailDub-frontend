import supabase from "../setup/supabase";
import oldCustomers, { stripeIds } from "./oldCustomers";

const threeDays = 24 * 60 * 60 * 1000 * 1;

const isCountUnderLimit = (analyticsData: any) => {
  if (analyticsData?.messageCount <= 20) return true;
  else return false;
  const pastDate = new Date(analyticsData.created_at);
  const now = new Date();
  const diff: number = now.getTime() - pastDate.getTime();
  
  if (diff < threeDays && analyticsData.messageCount <= 15) return true;
  else return false;
}

export const messageLimiter = async (userId: string) => {

  const { data, error } = await supabase.auth.admin.getUserById(userId);
  const email = data?.user?.email;
  if (email && oldCustomers.includes(email)) {

    
    // add customer data
    const creation = await supabase.from('customers').upsert({
      userId: userId,
      email: data?.user?.email,
      amount: 5000,
      expiryDate:  null,
      stripeId: stripeIds[email]
    });

    if (!creation.error) {
      await supabase.from('migrated_customers').upsert({email: data?.user?.email})
    }
    
  }

  const customerData = await supabase.from('customers').select().eq('userId', userId).single();
  const customer = customerData?.data

  const analytics = await supabase.from('Analytics').select().eq('userId', userId);
  // console.log('analytics are: ', analytics)
  if (analytics.error)  console.log(analytics.error)
  const analyticsData = !analytics.error ? analytics.data[0] : {};

  const countUnderLimit = isCountUnderLimit(analyticsData);
  const valid = customer?.amount || !analyticsData?.userId || countUnderLimit;

  return {valid, analyticsData};
};

export const addMessageCount = async (analyticsData: any, userId: string, name: string) => {
  if (!analyticsData) {
    // There should already be data from before.
    const updated = await supabase.from('Analytics').upsert({ userId: userId, messageCount: 1, totalMessages: 1, lastExpertName: name });
    if (updated.error) console.log('add new Friend count error: ', updated.error)
    return;
  }
  const { messageCount, totalMessages } = analyticsData;
  if (!userId) return;
  const updated = await supabase.from('Analytics').upsert({userId: userId, messageCount: (messageCount+1), totalMessages: (totalMessages+1), lastExpertName: name})
  if (updated.error) console.log('add Friend count error: ', updated.error)
  return;
}

