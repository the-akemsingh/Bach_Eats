import { calistoga } from "@/app/fonts";
import ValidInvites from "@/components/page/valid-invites";



export default async function AllInvites() {
    
    return (
        <div className="min-h-screen relative top-32 flex flex-col items-center bg-white">
            <div className="flex flex-col gap-6 items-center justify-center w-full px-4">
                <h1 className={`text-5xl ${calistoga.className} mb-6 text-center`}>
                    {/* All Invites */}
                </h1>
               <ValidInvites></ValidInvites>
            </div>
        </div>
    );
}
