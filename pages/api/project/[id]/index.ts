import prisma from '../../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = Number(req.query.id)

  if (req.method === 'GET') {
    const project = await prisma.project.findUnique({
      where: {id},
      include: {schedules: true, levels: {include: {rooms: true}}}
    })
    return res.json(project)
  }
  return res.status(405).json({ message: 'Bad request: method not allowed.' })
}
