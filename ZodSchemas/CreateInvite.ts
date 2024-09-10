import {z} from 'zod';

export const CreateInvite=z.object({
    heading:z.string().max(500),
    pitch:z.string(),
    note:z.string().optional(),
    slots:z.number()
})