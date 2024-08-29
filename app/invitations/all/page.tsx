
import prisma from "@/PrismaClient";
import { calistoga, pacifico } from "@/app/fonts";

export default async function AllInvites() {
    const invites = await prisma.invite.findMany();

    return (
        <div className="min-h-screen  relative top-32 flex flex-col items-center bg-white">
            <div className=" flex flex-col gap-6 items-center justify-center w-full px-4">
                <h1 className={`text-5xl ${calistoga.className} mb-6 text-center`}>
                    All Invites
                </h1>
                <div className="w-full max-w-screen-lg mx-auto">
                    {invites.map(invite => (
                        <div
                            key={invite.id}
                            className="flex flex-col p-6 mb-4 bg-gray-100 shadow-lg rounded-xl transition-transform transform hover:scale-105"
                        >
                            <h2 className={`text-3xl mb-2 ${pacifico.className}`}>
                                {invite.heading}
                            </h2>
                            <p className="text-lg mb-2 text-gray-700">
                                {invite.pitch}
                            </p>
                            <p className="text-base text-gray-600">
                                {invite.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
