import { useNavigate } from "react-router-dom";

function Page() {
  return (
    <div className=" py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-30">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Natijalar
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full flex items-center justify-center">
        <div>
          <h2 className="text-center font-bold mb-8 text-[33px]">G'olib</h2>
          <div className="flex justify-center items-center py-10 px-10 md:w-[450px] bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
            <h3 className="text-[25px] text-center text-white leading-[100%] font-bold z-10">
              Doniyor 100% to’g’ri 23 Soniyada bajardi
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
