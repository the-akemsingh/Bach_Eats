"use server";

import prisma from "@/PrismaClient";

export default async function getGuestList({ inviteId }: { inviteId: string }) {
  try {
    const res = await prisma.acceptedInvites.findMany({
      where: {
        inviteId,
      },
      select: {
        guest: {
          select: {
            id: true,
            name: true,
            phonenumber: true,
            gender: true,
            instagramUsername: true,
          },
        },
      },
    });

    return {
      users: res.map(item => item.guest), // Only return the `guest` details
      status: 200,
    };
  } catch (e) {
    return {
      message: "Error occurred",
      status: 500,
    };
  }
}
