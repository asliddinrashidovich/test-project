import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/useAuthStore";
import { teacherSocket } from "../../../socket";

function Page() {
  const navigate = useNavigate();
  const [quizId] = useQueryState("quizId");
  const [quiz, setQuiz] = useState();
  const accessToken = useAuthStore((store) => store.accessToken);
  const [students, setStudents] = useState([]);
  const [teacherN, setTeacherN] = useState();
  const teacherName = JSON.parse(localStorage.getItem("user"));
  const roomCodeString = JSON.parse(localStorage.getItem("roomCode"));

  const socketRef = useRef(teacherSocket);

  useEffect(() => {
    const socket = socketRef.current;

    // Socketni ulanadi
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);

      socket.emit("joinRoom", {
        roomCode: String(roomCodeString.roomCode),
        name: teacherName.name ?? "",
      });
    });

    const handleStudentList = (data) => {
      console.log("auth students =>", data.students);
      console.log("auth teacher =>", teacherName);

      const students = data.students.filter(
        (student) => student.name !== teacherName.name
      );

      setStudents(students);
    };

    socket.on("studentListUpdate", handleStudentList);

    return () => {
      socket.off("connect");
      socket.off("studentListUpdate", handleStudentList);
      // Komponent unmount bo‘lganda disconnect qilamiz
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setQuiz(res?.data?.data);
        setTeacherN(res?.data?.data?.teacher?.name);
      } catch (err) {
        toast.error(err?.response?.data?.message ?? "Something went wrong!");
      }
    };
    getData();
  }, [quizId, accessToken]);

  const handleStartQuiz = () => {
    socketRef.current.emit("startQuiz");

    socketRef.current.on("quizList", (data) => {
      console.log(" QuizList keldi:", data);
      navigate("/dashboard/quiz/status");
    });
  };

  return (
    <div className="py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Kirish uchun kod
        </h3>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 min-[600px]:grid-cols-2 gap-[50px] min-[1000px]:gap-[100px]">
        <div className="flex w-full justify-center items-center h-[250px] px-20 lg:px-30 bg-[#141f25] rounded-[30px]">
          <h3 className="text-[30px] sm:text-[40px] text-white leading-[100%] font-bold">
            {quiz?.roomCode}
          </h3>
        </div>

        <div className="w-full bg-[#141f25] rounded-[30px]">
          <h3 className="text-[25px] font-bold text-center text-white mt-7 mb-10">
            O’quvchilar {students.length}
          </h3>
          <div className="px-10">
            {!students.length ? (
              <span className="text-white">O'quvchilar yo'q</span>
            ) : (
              students.map((student, idx) => (
                <h3 key={idx} className="text-white text-[20px] font-bold mb-3">
                  {idx + 1}. {student.name}
                </h3>
              ))
            )}
          </div>
        </div>

        <div className="min-[600px]:col-span-2">
          <Button
            onClick={handleStartQuiz}
            className="w-full cursor-pointer bg-[#141f25] text-white text-[35px]"
          >
            BOSHLASH
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
