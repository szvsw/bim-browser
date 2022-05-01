-- CreateTable
CREATE TABLE "Level" (
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("name","projectId")
);

-- CreateTable
CREATE TABLE "Room" (
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "levelName" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "edges" JSONB NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("number","projectId")
);

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_levelName_projectId_fkey" FOREIGN KEY ("levelName", "projectId") REFERENCES "Level"("name", "projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
