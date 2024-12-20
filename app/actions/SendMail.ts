"use server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "@/PrismaClient";
import { v4 as uuidv4 } from 'uuid';

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
    const token = uuidv4();
    if (email_type === EmailType.VERIFY) {
      const user = await prisma.user.findUnique({
        where: { email },
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
          verificationTokenExpiry: new Date(Date.now() + 3600000), // Added 1 hour expiry
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const senderAddress = process.env.USER as string;
    
    // Improved HTML template with inline CSS for better email client compatibility
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Bach Eats</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Please click the button below to ${email_type === EmailType.VERIFY ? "verify your email" : "reset your password"}
        </p>
        <div style="margin: 30px 0;">
          <a href="${process.env.URL}/verifymail?token=${token}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            ${email_type === EmailType.VERIFY ? "Verify Email" : "Reset Password"}
          </a>
        </div>
        <p style="color: #999; font-size: 14px;">
          <strong>NOTE:</strong> This link is only valid for one hour
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: "Bach Eats",
        address: senderAddress,
      },
      to: email,
      subject: email_type === EmailType.VERIFY 
        ? "Verify your email" 
        : "Reset your password",
      html: htmlContent,
      // Add plain text alternative for better deliverability
      text: `Please ${email_type === EmailType.VERIFY ? "verify your email" : "reset your password"} by clicking this link: ${process.env.URL}/verifymail?token=${token} (Link valid for one hour)`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      message: "Error sending verification mail",
      status: 500,
    };
  }
}