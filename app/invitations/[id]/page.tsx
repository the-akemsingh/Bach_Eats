import prisma from "@/PrismaClient";
import { calistoga } from "@/app/fonts";

interface InviteDetailsProps {
    params: {
        id: string;
    };
}

export default async function InviteDetails({ params }: InviteDetailsProps) {
    const { id } = params;

    const invite = await prisma.invite.findUnique({
        where: { id: String(id) },
    });

    if (!invite) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl text-red-500">Invite not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative top-32 flex flex-col items-center bg-white">
            <div className="flex flex-col gap-6 items-center justify-center w-full px-4"  >
                <h1 className={`text-5xl ${calistoga.className} mb-6 text-center`}>
                    {invite.heading}
                </h1>
                <div className="w-full max-w-screen-lg mx-auto">
                    <div
                        className="flex flex-col p-6 mb-4 bg-gray-100 shadow-lg rounded-xl"
                    >
                        <p className="text-lg mb-2 text-gray-700">
                            {invite.pitch}
                        </p>
                        <p className="text-base text-gray-600">
                            {invite.note}
                        </p>
                        <p className="text-sm text-gray-500">
                            Slots: {invite.slots}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
