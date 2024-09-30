"use server";

import prisma from "@/PrismaClient";

export default async function isUserReqAccepted({
  inviteId,
  userId,
}: {
  inviteId: string;
  userId: string;
}) {
  try {
    const res = await prisma.acceptedInvites.findFirst({
      where: {
        inviteId: inviteId,
        guestId: userId,
      },
    });

    if (res) {
      return {
        message: "Request Already Accepted",
        status: 201,
      };
    } else {
      return {
        message: "Request Not Accepted",
        status: 404,
      };
    }
  } catch (e) {
    return {
      message: "Error occurred",
      status: 500,
    };
  }
}
