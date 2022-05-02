
import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const {levelName,pid} = JSON.parse(req.body)
    const levelToFetch = {levelName, projectId: Number(pid)}
    const comments = await prisma.comment.findMany({
      where: levelToFetch
    })
    return res.json(comments)
  } 
  if (req.method === 'POST') {
    const data = req.body
    const result = await prisma.comment.create({
      data
    })
    return res.json(result)
  }
  return res.status(405).json({ message: 'Bad request: method not allowed.' })
  
}
