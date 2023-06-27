// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authHandler from '@/utils/authHandler';
import supabase from '@/utils/setup/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'
import { object, string, array } from 'zod';
import runMiddleware from '@/utils/setup/middleware';

type Data = {
  data?: object,
  error?: string,
  premium?: boolean
}

const bodySchema = object({
  groupId: string(),
  userId: string()
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
    const { groupId, userId } = req.body;

    try {
      const { data, error } = await supabase.from('Group_User_X').delete().eq('userId', userId).eq('groupId', groupId);
      if (error) {
        console.error(error)
        throw 'Could not delete group'
      }
      res.json({ data: {success: true} });
    } catch (e) {
      res.status(200).json({ error: 'Could not delete group' });
    }



  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
