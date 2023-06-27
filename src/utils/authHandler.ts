import type { NextApiRequest } from 'next';


// validates the token and returns a boolean
export default async function authHandler(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader)  throw "Invalid authorization";;
  // the token is the mindplug key
  const token = authHeader!.split(' ')[1];
  if (token === 'maildubInternal') return true;
  throw 'Invalid Auth';
}