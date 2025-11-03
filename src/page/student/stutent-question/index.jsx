
function Page() {
  return (
    <div className="main min-h-screen py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          To’g’ri javobni tanlang
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto p-10 bg-[#141f25] rounded-[30px] mb-16">
        <h3 className="text-[40px] leading-[100%] font-bold text-center text-white">
          O’zbekistonning poytaxti qayer?
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}

export default Page;
