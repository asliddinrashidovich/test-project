import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useQueryState } from "nuqs";
import { socket } from "../../../socket";
import toast from "react-hot-toast";

function Page() {
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();
  const [roomCode] = useQueryState("roomCode");
  const [studentName] = useQueryState("name");
  const navigate = useNavigate();
  const socketRef = useRef(socket);
  const teacher = JSON.parse(localStorage.getItem("roomData"));

  useEffect(() => {
    if (!socketRef.current.connected) {
      socketRef.current.connect();
    }

    socketRef.current.emit("joinRoom", {
      roomCode: String(roomCode),
      name: studentName,
    });

    // O'quvchilar ro'yxatini olish
    const handleStudentList = (data) => {
      const uniqueStudents = Array.from(
        new Map(data.students.map((s) => [s.name, s])).values()
      );
      const filteredData = uniqueStudents.filter(
        (t) => t.name !== teacher.teacher.name
      );
      const filteredData2 = filteredData.filter((t) => t.name !== "");
      setStudents(filteredData2);
    };

    const handleQuizList = (data) => {
      setQuestions(data.quiz.questions);
      setQuiz(data);
    };
    
    socketRef.current.on("quizList", handleQuizList);
    socketRef.current.on("studentListUpdate", handleStudentList);

    return () => {
      socketRef.current.off("quizList", handleQuizList);
      socketRef.current.off("studentListUpdate", handleStudentList);
    };
  }, [roomCode, studentName, teacher]);

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("quiz", JSON.stringify(quiz))
      navigate("/students/questions");
    }
  }, [questions, navigate]);

  const handleStartQuiz = () => {
    if (questions.length > 0) {
      navigate("/students/questions");
    } else {
      toast.error("Test hali boshlanmagan");
    }
  };

  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Boshlanishiga oz qoldi
        </h3>
      </div>
      <div className="flex flex-col max-[500px]:w-full p-10">
        <div className="w-full bg-[#141f25] rounded-[30px] mb-10">
          <h3 className="text-[25px] font-bold text-center text-white mt-7 mb-5">
            O’quvchilar {students.length}
          </h3>
          <div className="px-5 mb-5">
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
        <div className="col-span-2">
          <Button
            onClick={handleStartQuiz}
            className="w-full bg-[#141f25] text-white cursor-pointer text-[35px]"
          >
            Tez orada test boshlanadi...
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
