/*
  Warnings:

  - Added the required column `fromId` to the `ReceivedInviteReq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReceivedInviteReq" ADD COLUMN     "fromId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReceivedInviteReq" ADD CONSTRAINT "ReceivedInviteReq_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
