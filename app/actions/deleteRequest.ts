"use server"

import prisma from "@/PrismaClient"

export default async function deleteRequest({requesterId,inviteId}:{requesterId:string,inviteId:string}){
    try{
        const res=await prisma.receivedInviteReq.deleteMany(
            {
                where:{
                    fromId:requesterId,
                    inviteId:inviteId
                }
            }
        );
        return{
            message:"Request deleted successfully",
            status:200
        }
    }
    catch(e){
        return{
            message:"Error occurred while deleting request",
            status:500
        }
    }
}