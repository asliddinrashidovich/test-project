import { z } from "zod";

const Schema = z.object({
    name: z.string(),
    lastName: z.string(),
    phone: z.string(),
    password: z.string(),
    password2: z.string(),
})

export default Schema 
