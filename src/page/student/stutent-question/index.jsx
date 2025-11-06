import { useEffect, useRef, useState } from "react";
import { studentSocket } from "../../../socket";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Page() {
  const [quizList, setQuizList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: answerId }
  const [answerResults, setAnswerResults] = useState({}); // { questionId: true/false }
  const navigate = useNavigate();
  const [correctAns, setCorrectAns] = useState(); // { questionId: true/false }
  const socketRef = useRef(studentSocket);
  const studentData = JSON.parse(localStorage.getItem("studentData"));
  const studentId = JSON.parse(localStorage.getItem("studentId"));

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket.connected) socket.connect();

    socket.emit("startQuiz");

    const handleQuizList = (data) => {
      console.log("📜 quizList:", data);
      const questions = data.quiz.questions || [];
      setQuizList(questions);
    };

    socket.on("quizList", handleQuizList);
    socket.on("answerIsCorrect", (data) => {
      setCorrectAns(data.isCorrect);
    });

    return () => {
      socket.off("quizList", handleQuizList);
    };
  }, []);

  const handleSelectOption = (questionId, answerId, isCorrect) => {
    // 🔒 har bir savol faqat bir marta tanlanadi
    if (selectedAnswers[questionId]) return;

    // Tanlangan javobni yozamiz
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    // To‘g‘rilikni yozamiz
    setAnswerResults((prev) => ({
      ...prev,
      [questionId]: isCorrect,
    }));

    // Serverga yuborish (agar kerak bo‘lsa)
    socketRef.current.emit("answer", {
      answerId,
      questionId,
      roomCode: studentData?.roomCode,
    });

    console.log("📤 Javob yuborildi:", {
      answerId,
      questionId,
      isCorrect,
    });
  };

  async function handleSubmit() {
    try {
      const res = await axios.post(`/api/result`, { studentId: studentId.id });
      localStorage.setItem("studentResult", JSON.stringify(res?.data));
      navigate(`/students/result/${studentId.id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  }
  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] font-bold text-center text-white">
          Test boshlandi, savollarga javob bering
        </h3>
      </div>

      {quizList.map((item, index) => (
        <div
          key={item.id}
          className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] mb-10"
        >
          <h3 className="text-[40px] font-bold text-start text-white mb-10">
            {index + 1}. {item.questionText}
          </h3>

          <div className="flex flex-col gap-5">
            {item.answers.map((answerItem, answerIndex) => {
              const isSelected = selectedAnswers[item.id] === answerItem.id;
              const isAnswered = selectedAnswers[item.id] !== undefined;
              const isCorrect = answerResults[item.id];

              let borderColor = "border-white hover:border-orange-400";

              // 🔸 Ranglarni aniqlash
              if (isSelected && isAnswered) {
                if (isCorrect) {
                  // toast.success("Siz to'g'ri javob berdingiz")
                  borderColor = "border-green-500 bg-green-500/10";
                } else {
                  // toast.error("Siz noto'g'ri javob berdingiz")
                  borderColor = "border-red-400 bg-red-500/10";
                }
              }

              return (
                <div
                  key={answerItem.id}
                  onClick={() =>
                    handleSelectOption(
                      item.id,
                      answerItem.id,
                      answerItem.isCorrect
                    )
                  }
                  className={`w-full cursor-pointer border-2 rounded-[10px] p-5 transition-all duration-200 ${borderColor}`}
                >
                  <h3 className="text-[20px] font-bold text-start text-white">
                    {answerIndex + 1}. {answerItem.answerText}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="submit"
        onClick={() => handleSubmit()}
        className="max-w-[1000px] w-full p-5 text-[20px] bg-white mb-10 cursor-pointer"
      >
        Yuborish
      </Button>
    </div>
  );
}

export default Page;
