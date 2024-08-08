/*
  Warnings:

  - You are about to drop the column `Expired` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Expired",
ADD COLUMN     "timeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
