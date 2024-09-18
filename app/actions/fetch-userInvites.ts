"use server";

import prisma from "@/PrismaClient";

export default async function UserInvites(userId: string) {
  try {
    const userInvites = await prisma.invite.findMany({
      where: {
        hostId:userId
      },
    });
    return{
        invites:userInvites
    }
  } catch (e) {
    return {
      message: "Error Occured",
      status: 500,
    };
  }
}
