"use server"
import prisma from "@/PrismaClient";
import { UserSignup } from "../ZodSchemas/Signup";

export async function signup({
  name,
  email,
  password,
  phonenumber,
}: {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
}) {
    const body = { name, email, phonenumber, password };
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
    const user = await prisma.user.create({
      data: { name, email, password, phonenumber },
    });
    return {
      message: "User Signed up successfully",
      status: 201,
    };
  } catch (e) {
    return {
      message: "Error Signing Up",
    };
  }
}