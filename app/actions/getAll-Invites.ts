"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/PrismaClient";
import { getServerSession } from "next-auth";

export async function allValid_Invites() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

    const activeInvites = await prisma.invite.findMany({
      where: {
        hostId: {
          not: userId, 
        },
        timeCreated: {
          gte: threeHoursAgo, 
        },
      },
      select: {
        id: true,
        heading: true,
        pitch: true,
        note: true,
        slots: true,
        emptyslots:true,
        host: {
          select: {
            id: true,
          },
        },
      },
    });

    if (activeInvites.length === 0) {
      return {
        message: "No invites available",
        status: 204,
      };
    }

    return {
      activeInvites,
      status: 200,
    };
  } catch (e) {
    return {
      message: "Error fetching the invites",
      status: 500,
    };
  }
}
