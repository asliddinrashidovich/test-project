import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";

function Page() {
  const accessToken = useAuthStore((store) => store.accessToken);
  const [quizs, setQuizs] = useState();
  const [questions, setQuestions] = useState();
  const [questionsAll, setQuestionsAll] = useState();
  console.log("quiz", quizs);
  console.log("questions", questions);

  const grouped = questions?.length ? Object.values(
    questions?.reduce((acc, item) => {
      if (!acc[item.quizId]) {
        acc[item.quizId] = { quizId: item.quizId, questions: [] };
      }
      acc[item.quizId].questions.push({
        id: item.id,
        questionText: item.questionText,
        answers: item.answers,
      });
      return acc;
    }, {})
  ) : []
  console.log("grouped",grouped)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/quiz", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setQuizs(res?.data?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message ?? "Something went wrong!");
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/question", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setQuestions(res?.data?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message ?? "Something went wrong!");
      }
    };
    getData();
  }, []);
  return (
    <div className="py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full  p-7 bg-[#141f25] rounded-[30px] mb-20">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Testlar
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-10">
        {grouped?.map(item => (
          <div key={item.quizId} className="py-10 px-6 bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
            <h2 className="text-[20px] font-semibold text-white">
              Test: <span>{item.quizId}</span>
            </h2>
            <h2 className="text-[20px] font-semibold text-white">
              Savollar soni: <span className="text-yellow-400">{item?.questions.length}</span>
            </h2>
            {/* <h2 className="text-[20px] font-semibold text-white">
              O'quvchilar soni: <span className="text-blue-400">1/1</span>
            </h2>
            <h2 className="text-[20px] font-semibold text-white">
              Qolgan vaqti: <span className="text-orange-300">53s</span>
            </h2>
            <h2 className="text-[20px] font-semibold text-white">
              Test muallifi: <span className="text-orange-300">userName</span>
            </h2> */}
          </div>
        ))}
        {/* <div className="py-10 px-6 bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
          <h2 className="text-[20px] font-semibold text-white">
            Holati: <span className="text-red-400">Tugagan</span>
          </h2>
          <h2 className="text-[20px] font-semibold text-white">
            Turi: <span className="text-yellow-400">Jamoviy</span>
          </h2>
          <h2 className="text-[20px] font-semibold text-white">
            O'quvchilar soni: <span className="text-blue-400">10/20</span>
          </h2>
          <h2 className="text-[20px] font-semibold text-white">
            Qolgan vaqti: <span className="text-orange-300">0s</span>
          </h2>
          <h2 className="text-[20px] font-semibold text-white">
            Test muallifi: <span className="text-orange-300">userName</span>
          </h2>
          <h2 className="text-[20px] font-semibold text-white">
            Go'lib: <span className="text-orange-300">student</span>
          </h2>
        </div> */}
      </div>
    </div>
  );
}

export default Page;
