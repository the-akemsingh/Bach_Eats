"use server"
import prisma from "@/PrismaClient";

export default async function sendInviteReq({
  inviteId,
  guestId,
}: {
  inviteId: string;
  guestId: string;
}) {
  try {
    //check if request already sent
    const requestExists = await prisma.receivedInviteReq.findFirst({
      where: {
        inviteId,
        fromId: guestId,
      },
    });
    if (requestExists) {
      return {
        message: "Request already sent",
        status: 200,
      };
    }
    //send request
    const newRequest= await prisma.receivedInviteReq.create({
        data:{
            inviteId,
            fromId:guestId
        }
    })
    return{
        message:"Request Sent",
        status:201
    }
  } catch (e) {
    return{
        message:"Error Occured while sending request",
        status:500
    }
  }
}
