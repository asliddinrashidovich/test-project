import { useEffect, useRef, useState } from "react";
import { studentSocket } from "../../../socket";

function Page() {
  const [quizList, setQuizList] = useState([]);
  const socketRef = useRef(studentSocket);
  const quizes = JSON.parse(localStorage.getItem("quiz"));

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

    return () => {
      // socket.off();
      socket.off("quizList", handleQuizList);
      // socket.disconnect();
    };
  }, []);

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
      {quizList.map((quiz, index) => (
        <div className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] ">
          <h3 className="text-[40px] leading-[100%] font-bold text-start text-white mb-10">
            {index + 1}. {quiz.questionText}
          </h3>
          <div className="flex flex-col gap-5">
            {quiz.answers.map((answer, index) => (
              <div
                className={`w-full cursor-pointer border-2 rounded-[10px] p-5`}
                onClick={() => seQuestionCode("2")}
              >
                <h3 className="text-[20px] leading-[100%] font-bold text-start text-white">
                  {index + 1}. {answer.answerText}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <div className="grid grid-cols-3 gap-4">
        <div className="flex justify-center items-center h-[250px] w-full px-10 bg-[#141f25] rounded-[30px] cursor-pointer ">
          <h3 className="text-[40px] text-white leading-[100%] font-bold z-10">
            Samarqand
          </h3>
        </div>
        <div className="flex justify-center items-center h-[250px] w-full px-10 bg-[#141f25] rounded-[30px] cursor-pointer ">
          <h3 className="text-[40px] text-white leading-[100%] font-bold z-10">
            Andijon
          </h3>
        </div>
        <div className="flex justify-center items-center h-[250px] w-full px-10 bg-[#141f25] rounded-[30px] cursor-pointer ">
          <h3 className="text-[40px] text-white leading-[100%] font-bold z-10">
            Toshkent
          </h3>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
