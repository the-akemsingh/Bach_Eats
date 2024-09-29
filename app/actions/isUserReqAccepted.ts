"use server";

import prisma from "@/PrismaClient";

export default async function isUserReqAccepted({inviteId,userId,}:{inviteId: string;userId: string;}){
  try {
    const res = await prisma.acceptedInvites.findFirst({
      where:{
        inviteId: inviteId,
        guestId: userId,
      },
    });
    return{
        message: "Request Accepted",
        status: 201,
    }
  } catch (e) {
    return {
      message: "Error occured",
      status: 500,
    };
  }
}
