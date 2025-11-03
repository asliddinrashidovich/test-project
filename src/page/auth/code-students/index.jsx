import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";

function Page() {
  const navigate = useNavigate()
  return (
    <div className="py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Kirish uchun kod
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 min-[600px]:grid-cols-2 gap-[50px] min-[1000px]:gap-[100px]">
        <div className="flex w-full justify-center items-center h-[250px] px-20 lg:px-30 bg-[#141f25] rounded-[30px] cursor-pointer ">
          <h3 className="text-[30px] sm:text-[40px] text-white leading-[100%] font-bold z-10">
            1390
          </h3>
        </div>
        <div className="w-full min-w-[200px] bg-[#141f25] rounded-[30px]">
          <h3 className="text-[25px] font-bold leading-[100%] text-center text-white mt-7 mb-10">O’quvchilar  3/20</h3>
          <div className="px-10">
            <h3 className="text-white text-[20px] font-bold mb-3">1. Abdulloh </h3>
            <h3 className="text-white text-[20px] font-bold mb-3">2. Zamira </h3>
            <h3 className="text-white text-[20px] font-bold mb-3">3. Asliddin </h3>
          </div>
        </div>
        <div className="min-[600px]:col-span-2">
          <Button onClick={() => navigate("/dashboard/individual/status")} className={"w-full bg-[#141f25] text-white cursor-pointer text-[35px]"}>BOSHLASH</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
