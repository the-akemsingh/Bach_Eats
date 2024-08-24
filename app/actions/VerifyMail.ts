"use server";

import prisma from "@/PrismaClient";

export async function VerifyMail({
  VerificationToken,
}: {
  VerificationToken: string;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        VerificationToken,
      },
    });

    if (!user) {
      return {
        message: "Invalid token",
      };
    }

    const user_email=user.email;
    
    await prisma.user.update({
        where: { email:user_email },
        data: {
          isVerified : true,
          VerificationToken:null,
          verificationTokenExpiry : null,
        },
      });

    return {
      message: "Mail verified successfully",
      status:201
    };
  } catch (e) {
    return {
      message: "Error verifying mail",
      status:500
    };
  }
}
