-- AlterTable
ALTER TABLE "User" ALTER COLUMN "VerificationToken" DROP NOT NULL,
ALTER COLUMN "verificationTokenExpiry" DROP NOT NULL;
