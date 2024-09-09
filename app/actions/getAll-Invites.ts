"use server"

import prisma from "@/PrismaClient"
export async function allValid_Invites() {
    try{
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000); 

        const activeInvites = await prisma.invite.findMany({
            // where: {
            //   timeCreated: {
            //     gte: threeHoursAgo, 
            //   },
            // },
            select: {
              id: true,
              heading: true,
              pitch: true,
              note: true,
              slots: true,
              host: {
                select: {
                  id: true,
                },
              },
            },
          });
        if(!activeInvites){
            return{
                message:"No invites available",
                status:204
            }
        }
        return {
            activeInvites,
            status:201
        }
    }
    catch(e){
        return{
            message:"Error fetching the invites",
            status:500
        }
    }
}


