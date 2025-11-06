import { z } from "zod";

const phoneRegex = /^(?:\+998|998|8)?([0-9]{2})([0-9]{7})$/

const Schema = z.object({
  phoneNumber: z.string()
    .regex(phoneRegex, `Telefon raqam noto'g'ri formatda`)
    .min(1, "Telefon raqam kiritilishi shart"),
  password: z
    .string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
});

export default Schema;
