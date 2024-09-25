-- CreateTable
CREATE TABLE "AcceptedInvites" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "AcceptedInvites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcceptedInvites" ADD CONSTRAINT "AcceptedInvites_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcceptedInvites" ADD CONSTRAINT "AcceptedInvites_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
