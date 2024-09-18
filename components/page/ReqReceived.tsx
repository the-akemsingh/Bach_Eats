import isReqReceived from "@/app/actions/ReqReceived";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

export default async function ReqReceivedComponent() {
    const [invites, setInvites] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    useEffect(() => {
        async function fetchInvites() {
            setLoading(true);
            const res = await isReqReceived(userId);
            if (res.status === 201 && res.invites && res.invites.length > 0) {
                setInvites(res.invites);
            } else {
                setInvites([]);
            }
            setLoading(false); 
        }

        fetchInvites();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {invites.length > 0 ? (
                <div>
                    {invites.map(invite => (
                        <div key={invite.id}>
                            <h2>{invite.heading}</h2>
                            <p>{invite.pitch}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
