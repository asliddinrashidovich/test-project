import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";
import toast from "react-hot-toast";

function Page() {
  const navigate = useNavigate();
  const [, setRoomCode] = useQueryState("roomCode");
  const [quiz, setQuiz] = useState();
  const [rCode, setRCode] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/quiz/room-code`, {roomCode: rCode});
      setRoomCode(rCode);
      localStorage.setItem("roomData", JSON.stringify(res?.data?.data))
      navigate("/students/name");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  };
  return (
    <div className="main px-10 md:px-20 flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="text-center">
        <h2 className="text-[35px] font-bold mb-10">
          Kirish uchun kodni kiriting
        </h2>
        <div className="w-full md:w-[400px] mx-auto p-5 bg-white rounded-[10px]">
          <input
            className={
              "border-3 text-[25px] w-full mx-auto block font-bold outline-none rounded-[15px] px-4 py-5 border-[#141f25] mb-8"
            }
            value={rCode}
            onChange={(e) => setRCode(e.target.value)}
            placeholder={"kod"}
          />
          <Button
            type="submit"
            className={
              "w-full bg-[#141f25] text-white cursor-pointer text-[35px]"
            }
          >
            Yuborish
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
