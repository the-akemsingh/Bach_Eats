-- AlterTable
ALTER TABLE "User" ADD COLUMN     "VerificationToken" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationTokenExpiry" TIMESTAMP(3);
