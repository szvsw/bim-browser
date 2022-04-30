import type { NextApiRequest, NextApiResponse } from 'next'
import {Schedule} from '@prisma/client'
import prisma from '../../../../../lib/prisma'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req
  const projectId = Number(req.query.id)
  if (req.method === 'POST') {
    const schedules = JSON.parse(body)
    await prisma.schedule.deleteMany({
      where: {projectId: projectId, title: {notIn: schedules.map((schedule: Schedule)=>schedule.title)}}
    })
    schedules.map(async (schedule: Schedule)=> {
      console.log(`Writing schedule ${schedule.title}`)
      await prisma.schedule.upsert({
        where: {
          scheduleIdentifier: {
            projectId,
            title: schedule.title
          }
        },
        // @ts-ignore
        update: {...schedule,projectId},
        // @ts-ignore
        create: {...schedule,projectId}
      })
    })
    return res.status(200).json({'message': 'success'})
  }
  return res.status(405).json({'message': 'bad method'})
}
