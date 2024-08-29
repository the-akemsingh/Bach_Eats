import {z} from 'zod';

export const CreateInvite=z.object({
    heading:z.string().max(50),
    pitch:z.string(),
    note:z.string().optional(),
    slots:z.string()
})