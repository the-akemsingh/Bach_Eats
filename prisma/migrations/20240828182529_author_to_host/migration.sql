/*
  Warnings:

  - You are about to drop the column `authorId` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_authorId_fkey";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "authorId",
ADD COLUMN     "hostId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ReceivedInviteReq" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,

    CONSTRAINT "ReceivedInviteReq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivedInviteReq" ADD CONSTRAINT "ReceivedInviteReq_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
