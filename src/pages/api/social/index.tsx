// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authHandler from '@/utils/authHandler';
import supabase from '@/utils/setup/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'
import { object, string, array } from 'zod';
import runMiddleware from '@/utils/setup/middleware';
import openai from '@/utils/setup/openai';

type Data = {
  text?: string,
  error?: string,
  premium?: boolean
}

const bodySchema = object({
  social: string(),
  emailContent: string(),
});


const getTemplate = (socialMedia: string, emailContent: string) => {
  const systemTemplate = `
    You are a copywriter for different social media platforms who makes posts for marketing campaigns.

    Rules for social media platforms: 
      - for twitter keep text concise, limited to less than 280 characters.
    - for facebook, use emojis and visuals
    - for linkedin, keep text professional
    - for instagram, text must appeal to younger audience
  `
  const formattedContent = `Give me the copy for a formatted ${socialMedia} post of this email. This is for marketing to a large audience. \n\n Email: \n${emailContent}`;
  const chatData: any = [
    { role: 'system', content: systemTemplate},
    { role: 'user', content: formattedContent }
  ];
  return chatData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res);
  // try {
  //   await authHandler(req);
  // } catch (e: any) {
  //   console.log(e)
  //   return res.status(403).json({error: e})
  // }

  if (req.method === 'POST') {
    const result = bodySchema.safeParse(req.body);
    if (!result.success) return res.status(400).send({ error: 'Invalid required parameters'});
    const { social, emailContent } = req.body;

    try {
      
      const chatData = getTemplate(social, emailContent);
      const baseCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: chatData,
        temperature: 1.0,
        max_tokens: 2000,
        top_p: 1
      });
    
      const basePromptOutput = baseCompletion.data?.choices[0].message?.content;

      res.json({ text: basePromptOutput });

    } catch (e) {
      console.log(e);
      res.status(200).json({ error: 'Could not fetch info' });
    }

  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
