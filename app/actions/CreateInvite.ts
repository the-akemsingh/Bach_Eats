"use server";
import prisma from "@/PrismaClient";
import { CreateInvite } from "../../ZodSchemas/CreateInvite";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function CreateNewInvite({
  heading,
  meal,
  note,
}: {
  heading: string;
  meal: string;
  note: string;
}) {
  const session = await getServerSession(authOptions);

  const body = { heading, meal, note };
  const isValid = CreateInvite.safeParse(body);
  if (!isValid.success) {
    console.log(isValid.error);
    return {
      message: "One or more input is invalid",
    };
  }

  if (!session?.user?.id) {
    return {
      message: "Please Login or signup",
    };
  }
  const authorId = session?.user?.id;
  console.log(authorId);
  try {
    const post = await prisma.invite.create({
      data: {
        heading,
        meal,
        note,
        authorId,
      },
    });
    return {
      message: "Invite created successfuly",
      status: 201,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Error occured while posting",
    };
  }
}

