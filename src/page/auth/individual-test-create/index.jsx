import FormContent from "./form"

function Page() {
  return (
    <div className="py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-4 sm:p-7 bg-[#141f25] rounded-[30px] mb-10">
        <h3 className="text-[20px] sm:text-[35px] leading-[100%] font-bold text-center text-white">
          Yakka tartibli test yaratish
        </h3>
      </div>
      <FormContent/>
    </div>
  )
}

export default Page