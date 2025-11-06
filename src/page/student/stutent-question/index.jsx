import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket";

function Page() {
  const [quizList, setQuizList] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const socketRef = useRef(socket);
  const quizes = JSON.parse(localStorage.getItem("quiz"))
  console.log("local", quizes)

  useEffect(() => {
    if (!socketRef.current.connected) {
      socketRef.current.connect();
    }

    const handleQuizList = (data) => {
      console.log("📜 quizList:", data);
      setQuizList(data.questions || []);
    };

    socketRef.current.on("quizList", handleQuizList);

    return () => {
      socketRef.current.off("quizList", handleQuizList);
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
      {quizes?.quiz?.questions.map((item, index) => (
        <div className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] ">
          <h3 className="text-[40px] leading-[100%] font-bold text-start text-white mb-10">
            {index+1}. {item.questionText}
          </h3>
          <div className="flex flex-col gap-5">
            {item.answers.map((answerItem, answerIndex) => (
              <div
                key={item.id}
                className={`w-full ${correctAnswer === "1" ? "border-orange-500" : "border-white"} cursor-pointer border-2 rounded-[10px] p-5`}
                onClick={() => setCorrectAnswer("1")}
              >
                <h3 className="text-[20px] leading-[100%] font-bold text-start text-white">
                  {answerIndex+1}. {answerItem.answerText}
                </h3>
              </div>
            ))}
            {/* <div
              className={`w-full ${correctAnswer === "2" ? "border-orange-500" : "border-white"} cursor-pointer border-2 rounded-[10px] p-5`}
              onClick={() => setCorrectAnswer("2")}
            >
              <h3 className="text-[20px] leading-[100%] font-bold text-start text-white">
                1. Samarqand
              </h3>
            </div>
            <div
              className={`w-full ${correctAnswer === "3" ? "border-orange-500" : "border-white"} cursor-pointer border-2 rounded-[10px]  p-5`}
              onClick={() => setCorrectAnswer("3")}
            >
              <h3 className="text-[20px] leading-[100%] font-bold text-start text-white">
                1. Andijon
              </h3>
            </div> */}
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
