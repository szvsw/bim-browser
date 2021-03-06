import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === 'GET') {
    return res.json({message: "hello"})
  }
  if (req.method === 'POST') {
    console.log(req.body)
    return res.json({message: "success"})
  }
  return res.status(405).json({ message: 'Bad request: method not allowed.' })
}
