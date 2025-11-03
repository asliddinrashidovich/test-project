import { z } from "zod";

const Schema = z.object({
    phone: z.string(),
    password: z.string(),
})

export default Schema 
