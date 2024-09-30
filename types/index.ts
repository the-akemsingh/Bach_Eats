export interface inviteType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: number;
    emptyslots: number;
    timeCreated: Date;
    hostId: string;
}

export interface inviteWithRequestsType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: number;
    timeCreated: Date;
    hostId: string;
    reqReceived: {
        id: string;
        inviteId: string;
        fromId: string;
    }[];
}

export interface requesterType {
    id: string;
    name: string;
    phonenumber: string;
    gender: string;
    instagramUsername: string | null;
    isAccepted: boolean;
}
export interface acceptedInvites {
    id: string;
    inviteId: string;
    guestId: string;
}

export interface userType {
    id: string;
    name: string;
    phonenumber: string;
    gender: string;
    instagramUsername: string | null;
}