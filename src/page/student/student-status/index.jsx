import Button from "../../../components/button";

function Page() {
  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="w-full p-7 bg-[#141f25] rounded-[30px] mb-30">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Boshlanishiga oz qoldi
        </h3>
      </div>
      <div className="flex flex-col max-[500px]:w-full">
        <div className="w-full sm:w-[350px] py-6 mb-10 bg-[#141f25] rounded-[30px]">
          <h3 className="text-[25px] font-bold leading-[100%] text-center text-white mt-7 mb-10">O’quvchilar  3/20</h3>
          <div className="px-10">
            <h3 className="text-white text-[20px] font-bold mb-3">1. Abdulloh </h3>
            <h3 className="text-white text-[20px] font-bold mb-3">2. Zamira </h3>
            <h3 className="text-white text-[20px] font-bold mb-3">3. Asliddin </h3>
          </div>
        </div>
        <div className="col-span-2">
          <Button onClick={() => navigate("/dashboard/individual/status")} className={"w-full bg-[#141f25] text-white cursor-pointer text-[35px]"}>Biroz kuting</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
