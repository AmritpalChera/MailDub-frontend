"use client";
import { DOMAIN } from "@/utils/setup/domain";
import runMiddleware from "@/utils/setup/middleware";
import stripe from "@/utils/setup/stripe";
import supabase from "@/utils/setup/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);
  const priceId = process.env.NODE_ENV === 'development' ? 'price_1NRKViCzmG5Kf3gqmisjvGPh' : 'price_1NRJd4CzmG5Kf3gqSjF6mxY4'
  

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    mode: 'subscription',
    customer_email: req.body.email,
    client_reference_id: req.body.userId,
    success_url: `https://chrome.google.com/webstore/detail/maildub/hkdlodgnnioibefcbkcjfhkfbpmpnhbe`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url!);
}

