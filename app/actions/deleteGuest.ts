"use server";

import prisma from "@/PrismaClient";

export default async function deleteGuest({
  inviteId,
  guestId,
}: {
  inviteId: string;
  guestId: string;
}) {
  try {
    // Attempt to delete from AcceptedInvites
    const acceptedInviteDelete = await prisma.acceptedInvites.deleteMany({
      where: {
        inviteId,
        guestId,
      },
    });

    // Log the result of deletion
    console.log("Accepted Invites deleted count:", acceptedInviteDelete.count);

    // Attempt to delete from ReceivedInviteReq
    const receivedInviteDelete = await prisma.receivedInviteReq.deleteMany({
      where: {
        inviteId,
        fromId: guestId,
      },
    });

    // Log the result of deletion
    console.log("Received Invite deleted count:", receivedInviteDelete.count);

    // Update empty slots count if guests were successfully deleted
    if (acceptedInviteDelete.count > 0 || receivedInviteDelete.count > 0) {
      const inviteUpdate = await prisma.invite.update({
        where: {
          id: inviteId,
        },
        data: {
          emptyslots: {
            increment: 1,
          },
        },
      });

      return {
        status: 200,
        message: "Guest deleted successfully",
      };
    }

    return {
      status: 404,
      message: "No matching records found for deletion",
    };
  } catch (e) {
    console.error("Error occurred:", e);
    return {
      message: "Error occurred while deleting guest",
      status: 500,
    };
  }
}
