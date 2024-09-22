"use server";

import prisma from "@/PrismaClient";

export default async function isReqReceived(userId: string) {
  try {
    const invites = await prisma.invite.findMany({
      where: {
        hostId: userId,
        reqReceived: {
          some: {},
        },
      },
      include: {
        reqReceived: true,
      },
    });

    return {
      invites,
      status: 201,
    };
  } catch (e) {
    return {
      message: "Error Occurred",
      status: 500,
    };
  }
}

