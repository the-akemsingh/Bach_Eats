"use server"

import prisma from "@/PrismaClient"

export default async function deleteInvite(inviteId:string){
    try{
        // const res1= await prisma.acceptedInvites.deleteMany({
        //     where:{
        //         inviteId:inviteId
        //     }
        // })
        // const res2= await prisma.receivedInviteReq.deleteMany({
        //     where:{
        //         inviteId:inviteId
        //     }
        // })
        const res3= await prisma.invite.delete({
            where:{
                id:inviteId,
            }
        })
        return{
            message:"Invite Deleted",
            status:200,
        }
    }
    catch(e){
        console.log(e);
        return{
            message:"Error Occured",
            status:500
        }
    }
}