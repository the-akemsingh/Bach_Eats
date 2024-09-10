import prisma from "@/PrismaClient";

export default async function sendInviteReq({
  inviteId,
  guestId,
}: {
  inviteId: string;
  guestId: string;
}) {
  try {

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
