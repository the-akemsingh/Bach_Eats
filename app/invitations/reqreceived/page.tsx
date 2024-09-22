import isReqReceived from "@/app/actions/ReqReceived";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth";

interface inviteType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: string;
    timeCreated: Date;
    hostId: string;
    reqReceived: {
        id: string;
        inviteId: string;
        fromId: string;
    }[];
}

export default async function ReqReceived() {
    const session = await getServerSession(authOptions);
    const userID = session.user?.id;
    const res=(await isReqReceived(userID));
    const invites = res.invites;

    return <div>
        {invites!.map((invite:inviteType) => (
            <div className=" p-20 flex flex-col">
                {invite.reqReceived.length}
                <div className="mt-8">{invite.heading}</div>
                <div>{invite.pitch}</div>
                <div>{invite.slots}</div>
            </div>
        ))}
        
    </div>
}


