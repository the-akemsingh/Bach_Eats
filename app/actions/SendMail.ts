"use server";

import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "@/PrismaClient";

enum EmailType {
  VERIFY = "VERIFY",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export async function SendMail({
  email,
  user_id,
  email_type,
}: {
  email: string;
  user_id: string;
  email_type: EmailType;
}) {
  try {
    const token = await bcrypt.hash(user_id, 10);
    if (email_type == EmailType.VERIFY) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          message: "User not found",
        };
      }

      await prisma.user.update({
        where: { email },
        data: {
          VerificationToken: token,
          verificationTokenExpiry: new Date(Date.now()),
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        email_type === EmailType.VERIFY
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${
        process.env.URL
      }/verifymail?token=${token}">here</a> to ${
        email_type === EmailType.VERIFY
          ? "verify your email"
          : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.URL
        }/verifyemail?token=${token}
        *NOTE :  Link is only valid for one hour
        </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

  }
  catch (e) {
    return {
      message: "Error sending verification mail",
      status:500
    };
  }
}
