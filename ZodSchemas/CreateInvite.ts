import {z} from 'zod';

export const CreateInvite=z.object({
    heading:z.string().max(100),
    pitch:z.string(),
    note:z.string().optional(),
    slots:z.number().min(1)
})