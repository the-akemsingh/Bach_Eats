"use server";

import prisma from "@/PrismaClient";

export default async function AcceptInvite({
  requesterId,
  inviteId,
}: {
  requesterId: string;
  inviteId: string;
}) {
  try {
    //check if there is any eompty slot in the invite
    const invite = await prisma.invite.findUnique({
      where: {
        id: inviteId,
      },
    });
    if (!invite) {
      return {
        message: "Invite not found",
        status: 404,
      };
    }
    if (invite.emptyslots == 0) {
      return {
        message: "No empty slots",
        status: 400,
      };
    }

    //check if the user already accepted the invite
    const accepted = await prisma.acceptedInvites.findFirst({
      where: {
        inviteId: inviteId,
        guestId: requesterId,
      },
    });

    if (accepted) {
      return {
        message: "Invite already accepted",
        status: 400,
      };
    }

    //accept the invite
    const res = await prisma.acceptedInvites.create({
      data: {
        guestId: requesterId,
        inviteId: inviteId,
      },
    });

    const res2 = await prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        emptyslots: {
          decrement: 1,
        },
      },
    });
    return {
      status: 201,
    };
    
  } catch (e) {
    console.log(e);
    return {
      message: "Error occurred accepting invite",
      status: 500,
    };
  }
}
