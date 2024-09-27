"use server"

import prisma from "@/PrismaClient"

export default async function getInvitebyId(inviteId:string) {
    try{
        const invite= await prisma.invite.findUnique({
            where:{
                id:inviteId,
            }
        })
        return{
            invite,
            status:200
        }
    }
    catch(e){
        return{
            message:"Error Occured",
            status:500
        }
    }
}