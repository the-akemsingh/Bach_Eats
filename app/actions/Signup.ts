"use server";
import prisma from "@/PrismaClient";
import { UserSignup } from "../ZodSchemas/Signup";
import bcrypt from "bcrypt";
import { SendMail } from "./SendMail";

enum EmailType {
  VERIFY = "VERIFY",
  RESET_PASSWORD = "RESET_PASSWORD",
}


export async function signup({
  name,
  email,
  password,
  phonenumber,
  gender,
}: {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  gender: any;
}) {
  const body = { name, email, phonenumber, password, Gender:gender };
  const isValid = UserSignup.safeParse(body);
  if (!isValid.success) {
    console.log(isValid.error);
    return {
      message: "One or more input is invalid",
    };
  }

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isEmailUsed) {
    return {
      message: "Email already in use",
    };
  }

  const isPhoneNumberUsed = await prisma.user.findUnique({
    where: {
      phonenumber,
    },
  });
  if (isPhoneNumberUsed) {
    return {
      message: "Phone number already in use",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phonenumber, gender },
    });

    //for mail verification
    await SendMail({
      email: user.email,
      user_id: user.id,
      email_type: EmailType.VERIFY,
    });

    return {
      message: "User Signed up successfully",
      status: 201,
    };
  } catch (e) {
    console.log(e)
    return {
      message: "Error Signing Up",
      status: 500,
    };
  }
}
