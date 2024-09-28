/*
  Warnings:

  - Changed the type of `slots` on the `Invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AcceptedInvites" DROP CONSTRAINT "AcceptedInvites_inviteId_fkey";

-- DropForeignKey
ALTER TABLE "ReceivedInviteReq" DROP CONSTRAINT "ReceivedInviteReq_inviteId_fkey";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "slots",
ADD COLUMN     "slots" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AcceptedInvites" ADD CONSTRAINT "AcceptedInvites_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivedInviteReq" ADD CONSTRAINT "ReceivedInviteReq_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
