
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { Room } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req
  const data = JSON.parse(body)
  const projectId = Number(req.query.id)
  if (req.method === 'POST') {
    const levelNames = [... new Set(data.map((room: Room)=>room.levelName))]
    await Promise.all(levelNames.map(async (levelName)=> {
      await prisma.level.upsert({
        where: {
          name_projectId: {name: levelName as string, projectId: projectId as number}
        },
        create: {
            name: levelName as string,
            projectId: projectId as number
        },
        update: {
          name: levelName as string,
          projectId
        }
      })
    }))
    await prisma.room.deleteMany({
      where: {
        projectId
      }
    })
    await prisma.room.createMany({
      data
    })
    return res.status(200).json({'message': 'success'})
  }
  return res.status(405).json({'message': 'bad method'})
}
