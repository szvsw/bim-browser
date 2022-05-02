-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_levelName_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_levelName_projectId_fkey" FOREIGN KEY ("levelName", "projectId") REFERENCES "Level"("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
