import {z} from 'zod';

export const CreateInvite=z.object({
    heading:z.string().max(50),
    meal:z.string(),
    note:z.string().optional()
})