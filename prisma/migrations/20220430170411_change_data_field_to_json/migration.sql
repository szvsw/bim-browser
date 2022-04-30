/*
  Warnings:

  - The `headings` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `data` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "data",
ADD COLUMN     "data" JSONB NOT NULL,
DROP COLUMN "headings",
ADD COLUMN     "headings" TEXT[];
