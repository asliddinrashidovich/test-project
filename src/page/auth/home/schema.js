import { z } from "zod";

const Schema = z.object({
  testTime: z.number().min(30, "Test vaqti kamida 30 soniya bo'lishi kerak"),
});


export default Schema;
