import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const project = await prisma.project.findMany({
      include: {schedules: true, levels: {include: {comments: true, rooms: true}}}
    })
    return res.json(project)
  } 
  if (req.method === 'POST') {
    const {id, title}= JSON.parse(req.body)
    const result = await prisma.project.upsert({
      where: {id: id ? Number(id) : -1},
      create: {title},
      update: {title}
    })
    return res.json(result)
  }
  return res.status(405).json({ message: 'Bad request: method not allowed.' })
  
}
