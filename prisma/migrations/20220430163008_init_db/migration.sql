-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Sheet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "headings" TEXT NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);
