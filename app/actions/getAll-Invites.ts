"use server"

import prisma from "@/PrismaClient"
export async function all_Invites() {
    try{
        const invites= await prisma.invite.findMany();
        if(!invites){
            return{
                message:"No invites available",
                status:204
            }
        }

        return {invites,status:501}
    }
    catch(e){
        return{
            message:"Error fetching the invites",
            status:500
        }
    }
}