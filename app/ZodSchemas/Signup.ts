import {z} from 'zod'

export const UserSignup=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8).max(10),
    phonenumber:z.string().min(10).max(10)
})