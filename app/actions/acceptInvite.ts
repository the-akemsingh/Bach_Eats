"use server";

import prisma from "@/PrismaClient";

export default async function AcceptInvite({
  requester,
  inviteId,
}: {
  requester: string;
  inviteId: string;
}) {
  try {
    const res = await prisma.acceptedInvites.create({
      data: {
        guestId: requester,
        inviteId: inviteId,
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
