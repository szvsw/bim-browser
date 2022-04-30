
import type { NextApiRequest, NextApiResponse } from 'next'
// import {Schedule} from '@prisma/client'
import prisma from '../../../../../lib/prisma'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const projectId = Number(req.query.id)
  const scheduleId = Number(req.query.scheduleId)
  if (req.method === 'GET') {
    const schedule = await prisma.schedule.findUnique({where:{id:scheduleId}})
    return res.json(schedule)

  }
  return res.status(405).json({'message':'Bad method.'})
}
