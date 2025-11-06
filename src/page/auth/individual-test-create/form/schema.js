import z from "zod";

const Schema = z.object({
    title: z.string().nonempty("Sarlavha kiritilishi shart"),
    quizId: z.number(),
    questions: z.array(z.object({
        questionText: z.string().nonempty("Savol matni kiritilishi shart"),
        correctOption: z.number().optional(),
        options: z.array(z.object({
            answerText: z.string().nonempty("Javob matni kiritilishi shart"),
            isCorrect: z.boolean().optional()
        }))
    }))
})
export default Schema