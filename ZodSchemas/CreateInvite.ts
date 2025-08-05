import {z} from 'zod';

export const CreateInvite=z.object({
    heading:z.string().min(3).max(50),
    pitch:z.string().min(10).max(500),
    note:z.string().optional(),
    slots:z.coerce.number().min(1)
})