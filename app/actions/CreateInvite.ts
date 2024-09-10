"use server";
import prisma from "@/PrismaClient";
import { CreateInvite } from "../../ZodSchemas/CreateInvite";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function CreateNewInvite({
  heading,
  pitch,
  note,
  slots,
}: {
  heading: string;
  pitch: string;
  note: string | null ;
  slots: string;
}) {
  const session = await getServerSession(authOptions);

  const body = { heading, pitch, note, slots };
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
  const hostId = session?.user?.id;
  console.log(hostId);
  try {
    const post = await prisma.invite.create({
      data: {
        heading,
        pitch,
        hostId,
        note,
        slots,
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
      status:500
    };
  }
}
