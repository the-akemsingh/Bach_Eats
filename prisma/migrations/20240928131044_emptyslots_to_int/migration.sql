/*
  Warnings:

  - The `emptyslots` column on the `Invite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "emptyslots",
ADD COLUMN     "emptyslots" INTEGER;
