import FormContent from "./form"

function RegisterPage() {
  return (
    <div className="auth px-5 md:px-10 h-screen flex items-center justify-center">
      <div className="max-w-[1185px] w-full grid grid-cols-2 gap-[5px]">
        <div className="auth-left flex items-center justify-center bg-[#111] rounded-tl-[35px] rounded-bl-[35px] flex-col h-full">
          <div className="h-[50px] mb-[15px]">
            <img className="w-[200px] h-full object-cover" src="/logo.png" alt="" />
          </div>
          <h1 className="text-white text-[75px] font-extrabold leading-[100%] text-center">Odatdagidan osonroq va unumliroq</h1>
        </div>
        <div className=" flex items-center justify-center  bg-[#111] rounded-tr-[35px] rounded-br-[35px] px-[42px] text-center py-10">
          <FormContent />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage