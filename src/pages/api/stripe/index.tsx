import stripe from "@/utils/setup/stripe";
import supabase from "@/utils/setup/supabase";
import { NextApiRequest, NextApiResponse } from "next";

const twoMonths = 5184000000;
const threeMonths = 7776000000;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;
  if (type === 'checkout.session.completed') {
    // console.log(req.body?.data?.object)
    const { customer_details, client_reference_id, amount_total, customer, payment_status } = req.body?.data?.object;
    if (payment_status !== 'paid') return res.status(200).send({ success: true });
 
    if (!client_reference_id) return res.status(500).send({ error: 'Missing client identification' });

    // console.log('client refrence id: ', client_reference_id)
    // console.log('customer details: ', customer_details)
    // console.log('amount total: ', amount_total)
    // console.log('customer: ', customer)
    
    const creation = await supabase.from('customers').upsert({
      userId: client_reference_id,
      email: customer_details.email,
      amount: amount_total,
      expiryDate:  null,
      stripeId: customer || ""
    });

    // SAVE ERRORS IN DB LATER
    if (creation.error) console.log(creation.error)

    // No matter what they pay for now,the message limit increases to 1000
    const increaseLimit = await supabase.from('Analytics').upsert({userId: client_reference_id, messageLimit: 100000, friendLimit: 100000})
    if (increaseLimit.error) console.log('could not increases limits: ', increaseLimit.error)
    // CHANGE LIMIT IN ANALYTICS PLAN
  }
  else if (type === 'customer.subscription.deleted') {
    const { customer } = req.body?.data?.object;
    const userData: any = await stripe.customers.retrieve(customer);
    const email = userData.email;
    await supabase.from('customers').update({ amount: 0 }).eq('email', email);

    // CHANGE LIMIT IN THE ANALYTICS PLAN

  } else if (type === 'customer.subscription.updated') {
    // TODO: update the amount for the subscription

    // CHANGE LIMIT IN THE ANALYTICS PLAN
  }
  res.status(200).json({success: true});
}

