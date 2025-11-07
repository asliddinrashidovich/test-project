import { useEffect, useRef } from "react";
import { studentSocket } from "../../../socket";

function Page() {
  const result = JSON.parse(localStorage.getItem("studentResult")) || {};
  const socketRef = useRef(studentSocket);
  const dataLocal = localStorage.getItem("studentData");
  const studentData = JSON.parse(dataLocal);
  const studentId = JSON.parse(localStorage.getItem("studentId"));

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket.connected) socket.connect();

    socket.emit("endQuiz");
    socketRef.current.emit("endQuiz", {
      studentId: studentId.id,
      teacherId: studentData.teacher,
    });
    const handleResult = (data) => {
      console.log("📜 result:", data);
    };

    socket.on("result", handleResult);

    return () => {
      socket.off("result", handleResult);
    };
  }, []);
  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Natijalar
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full p-10 bg-[#141f25] rounded-[30px] mb-16">
        <h3 className="text-[40px] leading-[100%] font-bold text-center text-white mb-4">
          Sizning natijangiz {result.score}% 🎉🎉
        </h3>
        <p className="text-[20px] font-semibold text-white text-center mb-2">
          To'g'ri javoblar:{" "}
          <span className="text-green-400">{result.totalCorrect}</span>
        </p>
        <p className="text-[20px] font-semibold text-white text-center">
          Jami savollar:{" "}
          <span className="text-blue-400">{result.totalQuestion}</span>
        </p>
      </div>
      <div className="flex items-center justify-center">
        {/* <div>
          <h2 className="text-center font-bold mb-8 text-[33px]">G'olib</h2>
          <div className="flex justify-center items-center py-10 px-10 sm:w-[450px] bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
            <h3 className="text-[25px] text-center text-white leading-[100%] font-bold z-10">
              Doniyor 100% to’g’ri 23 Soniyada bajardi
            </h3>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Page;
