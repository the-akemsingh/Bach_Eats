/*
  Warnings:

  - Made the column `emptyslots` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "emptyslots" SET NOT NULL;
