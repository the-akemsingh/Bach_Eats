"use server";

import prisma from "@/PrismaClient";

export default async function myacceptedRequests(userId: string) {
  try {
    const invites = await prisma.acceptedInvites.findMany({
      where: {
        guestId: userId,
      },
    });

    if (invites.length > 0) {
      return {
        invites,
        status: 200,
      };
    } else {
      return {
        message: "No invites found",
        status: 404,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      message: "Error Occurred",
      status: 500,
    };
  }
}
