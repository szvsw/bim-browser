-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "cleared" BOOLEAN NOT NULL DEFAULT false,
    "levelName" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_levelName_projectId_fkey" FOREIGN KEY ("levelName", "projectId") REFERENCES "Level"("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;
