// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authHandler from '@/utils/authHandler';
import supabase from '@/utils/setup/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'
import { object, string, array } from 'zod';
import runMiddleware from '@/utils/setup/middleware';
import { messageLimiter } from '@/utils/analytics/messageLimiter';

type Data = {
  data?: object,
  error?: string,
  premium?: boolean
}

const bodySchema = object({
  groupId: string(),
  senderUserId: string(),
  text: string()
});


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res);
  let internalCall;
  try {
    const { internal } = await authHandler(req);
    internalCall = internal;
  } catch (e: any) {
    console.log(e)
    return res.status(403).json({error: e})
  }

 

  if (req.method === 'POST') {
    const result = bodySchema.safeParse(req.body);
    if (!result.success) return res.status(400).send({ error: 'Invalid required parameters'});
    const { groupId, senderUserId, text } = req.body;

    if (internalCall) {
      const limiterData = await messageLimiter(senderUserId);
      if (!limiterData.valid) return res.status(400).json({ error: 'Message limit for current plan reached', premium: true });
    }

    try {
      const { data, error } = await supabase.from('Message').insert({groupId, senderUserId, text}).select().single();
      await supabase.from('Message_Short').insert(data);
      if (error) {
        console.error(error)
        throw 'Could not record user message'
      }
      res.json({ data: data });
    } catch (e) {
      res.status(200).json({ error: 'Could not record message' });
    }



  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
