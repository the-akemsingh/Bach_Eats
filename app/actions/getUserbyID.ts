"use server"

import prisma from "@/PrismaClient"

export default async function getUserByID(userID: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            select: {
                id: true,
                name: true,
                phonenumber: true,
                gender: true,
                instagramUsername: true,
            },
        });

        if (!user) {
            return {
                message: "User not found",
                status: 404, 
            };
        }

        return {
            user,
            status: 200, 
        };
    } catch (e) {
        return {
            message: "Error occurred",
            status: 500,
        };
    }
}
