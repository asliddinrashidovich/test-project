import { User, Users } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Schema from "./schema";
import { useState } from "react";

function Page() {
  const [, setQuizId] = useQueryState("quizId");
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      testTime: undefined,
    },
  });

  const onSubmit = async (data) => {
    const { testTime, type } = data;
    try {
      const res = await axios.post(
        `/api/quiz`,
        { type, duration: testTime },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuizId(res?.data?.data.id);
      localStorage.setItem("roomCode", JSON.stringify(res?.data?.data));
      navigate("/dashboard/quiz");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <div className="py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-25">
        <h3 className="text-[25px] sm:text-[35px] leading-[100%] font-bold text-center text-white">
          Qanday test yaratmoqchisiz?
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="number"
          placeholder="Test vaqti (soniyada)"
          className="text-white text-[20px] p-10 border-none bg-[#141f25] w-full"
          {...register("testTime", { valueAsNumber: true })}
          error={errors.testTime?.message}
        />
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 min-[600px]:grid-cols-2 gap-[50px] min-[1000px]:gap-[100px] mt-6">
          <button
            type="button"
            onClick={() => {
              handleSubmit((data) =>
                onSubmit({ ...data, type: "INDIVIDUAL" })
              )();
            }}
            className="relative overflow-hidden flex justify-center items-center h-[250px] px-20 bg-[#141f25] rounded-[30px] cursor-pointer hover:bg-[#1d2b33] transition-all duration-300"
          >
            <h3 className="text-[30px] min-[1000px]:text-[40px] text-white leading-[100%] font-bold flex items-center flex-col gap-3">
              <User size={45} />
              Yakka
            </h3>
          </button>

          <button
            type="button"
            onClick={() => {
              handleSubmit((data) =>
                onSubmit({ ...data, type: "INDIVIDUAL" })
              )();
            }}
            className="relative overflow-hidden flex justify-center items-center h-[250px] px-20 bg-[#141f25] rounded-[30px] cursor-pointer hover:bg-[#1d2b33] transition-all duration-300"
          >
            <h3 className="text-[30px] min-[1000px]:text-[40px] text-white leading-[100%] font-bold z-10 flex items-center flex-col gap-3">
              <Users size={45} />
              Jamoaviy
            </h3>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
