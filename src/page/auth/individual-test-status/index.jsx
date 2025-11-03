import { useNavigate } from "react-router-dom";

function Page() {
  return (
    <div className="py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full  p-7 bg-[#141f25] rounded-[30px] mb-30">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Test boshlandi
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full flex items-center justify-center">
        <div className="flex justify-center items-center py-10 px-10 w-[350px] bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
          <h2 className="text-[100px] font-bold text-white">53</h2>
          <h3 className="text-[40px] text-center text-white leading-[100%] font-bold z-10">
            Testning qolgan vaqti
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Page;
