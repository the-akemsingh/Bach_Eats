import prisma from "@/PrismaClient"


export default async function AllInvites() {
    const invites = await prisma.invite.findMany();

    return (
        <div className="flex flex-col text-black">
            {invites.map(invite => (
                <div className=" flex flex-col">
                    <div> {invite.heading}</div>
                    <div> {invite.meal}</div>
                    <div> {invite.note}</div>
                </div>
            ))}
        </div>
    )
}