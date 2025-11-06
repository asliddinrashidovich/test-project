import FormContent from "./form"

function RegisterPage() {
  return (
    <div className="auth px-10 md:px-20 h-screen flex items-center justify-center">
      <div className="max-w-[1185px] w-full grid max-[800px]:px-5 max-[1000px]:px-30 min-[1000px]:grid-cols-2 gap-[25px]">
        <div className=" max-[1000px]:hidden flex items-center justify-center  rounded-tl-[35px] rounded-bl-[35px] flex-col h-full">
          <div className="h-[50px] mb-[15px]">
            <img className="w-[200px] h-full object-cover" src="/logo.png" alt="" />
          </div>
          <h1 className="text-white text-[35px] min-[1000px]:text-[65px] min-[1100px]:text-[75px] font-extrabold leading-[100%] text-center">Odatdagidan osonroq va unumliroq</h1>
        </div>
        <div className="h-[50px] mb-[15px] mx-auto  min-[1000px]:hidden">
          <img className="w-[200px] h-full object-cover" src="/logo.png" alt="" />
        </div>
        <div className="w-full flex items-center justify-center  bg-[#141f25] rounded-[30px] px-[42px] text-center py-10">
          <FormContent />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage