// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authHandler from '@/utils/authHandler';
import supabase from '@/utils/setup/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'
import { object, string, number } from 'zod';
import runMiddleware from '@/utils/setup/middleware';

type Data = {
  data?: object,
  error?: string,
  premium?: boolean
}

const bodySchema = object({
  userId: string(),
});


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res);
  try {
    await authHandler(req);
  } catch (e: any) {
    console.log(e)
    return res.status(403).json({error: e})
  }

  if (req.method === 'POST') {
    const result = bodySchema.safeParse(req.body);
    if (!result.success) return res.status(400).send({ error: 'Invalid required parameters'});
    const { userId } = req.body;

    try {
      // get everything if min and max range not specified
      const groupInfo: any = await supabase.from('Group_User_X').select(`groupId (name, groupId, imageUrl, lastMessage, lastUpdated)`).eq('userId', userId).order('lastGroupUpdated', {ascending: false});
      
      if (groupInfo.error) {
        console.error(groupInfo.error)
        throw 'Could not fetch group info'
      }

      res.json({ data: groupInfo.data });
    } catch (e) {
      res.status(200).json({ error: 'Could not fetch info' });
    }



  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
