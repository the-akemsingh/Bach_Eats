/*
  Warnings:

  - Made the column `VerificationToken` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verificationTokenExpiry` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "VerificationToken" SET NOT NULL,
ALTER COLUMN "verificationTokenExpiry" SET NOT NULL;
