import { useEffect, useRef, useState } from "react";
import { studentSocket } from "../../../socket";
import Button from "../../../components/button";

function Page() {
  const [quizList, setQuizList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const socketRef = useRef(studentSocket);
  // const quizes = JSON.parse(localStorage.getItem("quiz"));
  const studentData = JSON.parse(localStorage.getItem("studentData"));

  useEffect(() => {
    const socket = socketRef.current;

    // Socketni ulanadi
    if (!socket.connected) {
      socket.connect();
    }

    socketRef.current.emit("startQuiz");

    const handleQuizList = (data) => {
      console.log("📜 quizList:", data);
      const questions = data.quiz.questions || [];
      console.log("Questions:", questions);
      setQuizList(questions);
    };

    socket.on("quizList", handleQuizList);
    socket.on("answerIsCorrect", (data) => {
      console.log("Bu ishladi");
      console.log(data);
    });

    return () => {
      // socket.off();
      socket.off("quizList", handleQuizList);
      // socket.disconnect();
    };
  }, []);

  const handleSelectOption = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    socketRef.current.emit("answer", {
      answerId,
      questionId,
      roomCode: studentData.roomCode,
    });
    console.log(
      ("answer",
      {
        answerId,
        questionId,
        roomCode: studentData.roomCode,
      })
    );
  };

  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Test boshlandi, savollarga javob bering
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] mb-7">
        <h3 className="text-[27px] leading-[100%] font-bold text-center text-white">
          Qolgan vaqt: <span className="text-orange-300">53</span>
        </h3>
      </div>
      {quizList.map((item, index) => (
        <div
          key={index}
          className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] mb-10"
        >
          <h3 className="text-[40px] leading-[100%] font-bold text-start text-white mb-10">
            {index + 1}. {item.questionText}
          </h3>
          <div className="flex flex-col gap-5">
            {item.answers.map((answerItem, answerIndex) => {
              const isSelected = selectedAnswers[item.id] === answerItem.id; // 🔸 tanlangan javobni tekshiradi
              return (
                <div
                  key={answerItem.id}
                  onClick={() => handleSelectOption(item.id, answerItem.id)}
                  className={`w-full cursor-pointer border-2 rounded-[10px] p-5 transition-all duration-200 ${
                    isSelected
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white hover:border-orange-400"
                  }`}
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
        className="w-full p-5 text-[20px] bg-white mb-10 cursor-pointer"
      >
        Yuborish
      </Button>
    </div>
  );
}

export default Page;
