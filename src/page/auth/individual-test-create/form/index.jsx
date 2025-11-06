import Input from "../../../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/button";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import Schema from "./schema";
import QuestionBlock from "./questionBlock";
import { useState } from "react";
import { useQueryState } from "nuqs";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../../../../store/useAuthStore";

function FormContent() {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useQueryState("quizId");
  const [correctQuizId, setCorrectQuizId] = useState();
  const accessToken = useAuthStore((state) => state.accessToken);

  const form = useForm({
    resolver: zodResolver(Schema),

    defaultValues: {
      title: "",
      quizId: Number(quizId),
      questions: [
        {
          questionText: "",
          correctOption: 0,
          options: [{ answerText: "", isCorrect: true }],
        },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = form;

  const {
    fields: qFields,
    append: qAppend,
    remove: qRemove,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onActivateQuiz = async () => {
    try {
      await axios.patch(`/api/quiz/activate/${quizId}`, {}, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      })
      toast.success("Quiz aktivlashdi")
     } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  }

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      questions: data.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((opt, i) => ({
          answerText: opt.answerText,
          isCorrect: i === q.correctOption,
        })),
      })),
    };
    try {
      const res = await axios.post(`/api/question`, formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await onActivateQuiz()
      setQuizId(quizId);
      navigate("/dashboard/quiz/start");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full py-10 px-5 sm:px-10 min-[1000px]:px-20 bg-[#141f25] rounded-[30px] mb-5">
          <label>
            <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
              Test sarlavhasi
            </span>
            <Input
              placeholder="Sarlavha"
              className="text-white w-full"
              {...register("title")}
              error={errors.title?.message}
            />
          </label>
        </div>

        {qFields.map((qItem, index) => (
          <QuestionBlock
            key={qItem.id}
            index={index}
            correctQuizId={correctQuizId}
            control={control}
            errors={errors}
            setCorrectQuizId={setCorrectQuizId}
            register={register}
            removeQuestion={() => qRemove(index)}
            qLength={qFields.length}
          />
        ))}

        <Button
          type="button"
          className="w-full p-5 text-[20px] bg-[#141f25] mb-5 cursor-pointer text-white"
          onClick={() =>
            qAppend({
              questionText: "",
              options: [{ answerText: "", isCorrect: false }],
              correctOption: 0,
            })
          }
        >
          Yana savol qo'shish
        </Button>

        <Button
          type="submit"
          className="w-full border-[#141f25] border-4 p-5 text-[20px] bg-white mb-10 cursor-pointer"
        >
          KEYINGI BOSQICH
        </Button>
      </form>
    </div>
  );
}

export default FormContent;
