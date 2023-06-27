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
  email: string(),
  appId: string()
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
    const { email, appId } = req.body;

    const { error } = await supabase.from('Authorized_keys').select().eq('appId', appId).single();
    if (error) {
      return res.status(400).json({error: 'Invalid appId'})
    }

    try {
      const { data, error } = await supabase.from('Users_External').insert({ email: email, appId: appId }).select('userId').single();
      if (error) {
        console.error(error)
        throw 'Could not create user'
      }
      res.json({ data: data });
    } catch (e) {
      res.status(200).json({ error: 'Could not create user' });
    }

  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
