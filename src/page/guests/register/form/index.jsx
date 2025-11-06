import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import Schema from "./schema";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/useAuthStore";

function FormContent() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: undefined,
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    try {
      const res = await axios.post(`/api/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAccessToken(res.data.tokens.accessToken);
      setRefreshToken(res.data.tokens.setRefreshToken);
      localStorage.setItem("user", JSON.stringify(data))
      toast.success("Muvaffaqiyatli ro'yhatdan o'tdingiz!");
      navigate("/dashboard");
      setIsPending(false);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <h1 className="text-white text-[38px] font-medium mb-10">
        Ro’yhatdan o’tish
      </h1>

      <Input
        placeholder="Ismingiz"
        className="text-white w-full"
        type="text"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        placeholder="Familiyangiz"
        className="text-white w-full"
        type="text"
        {...register("surname")}
        error={errors.surname?.message}
      />

      <Input
        type="number"
        placeholder="Telefon raqamingiz"
        className="text-white w-full"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />

      <Input
        placeholder="Parol o’ylab toping"
        className="text-white w-full"
        {...register("password")}
        error={errors.password?.message}
        type={showPassword ? "password" : "text"}
        isPassword={true}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <Button
        className={`${
          isPending
            ? "bg-white/35 cursor-not-allowed"
            : "bg-white  cursor-pointer"
        } w-full  mb-9`}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Yuborilmoqda..." : "Ro’yhatdan o’tish"}
      </Button>

      <a href="/login" className="text-white">
        Avval ro’yhatdan o’tganmisiz?{" "}
        <span className="text-blue-500">Login</span>
      </a>
    </form>
  );
}

export default FormContent;
