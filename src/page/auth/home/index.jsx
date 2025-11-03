import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { User, Users } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Page() {
  const rippleRef = useRef(null);
  const rippleRef2 = useRef(null);
  const navigate = useNavigate()

  const handleRipple = (e) => {
    navigate("/dashboard/group")
    rippleRef.current?.start(e);
    setTimeout(() => {
      rippleRef.current?.stop(e);
    }, 300);
  };
  const handleRipple2 = (e) => {
    navigate("/dashboard/individual")
    rippleRef2.current?.start(e);
    setTimeout(() => {
      rippleRef2.current?.stop(e);
    }, 300);
  };

  return (
    <div className="py-10 px-10 md:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-25">
        <h3 className="text-[25px] sm:text-[35px] leading-[100%] font-bold text-center text-white">
          Qanday test yaratmoqchisiz?
        </h3>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 min-[600px]:grid-cols-2 gap-[50px] min-[1000px]:gap-[100px]">
        <div onClick={handleRipple2} className="relative overflow-hidden flex justify-center items-center h-[250px] px-20 bg-[#141f25] rounded-[30px] cursor-pointer hover:bg-[#1d2b33] transition-all duration-300">
          <h3 className="text-[30px] min-[1000px]:text-[40px] text-white leading-[100%] font-bold flex items-center flex-col gap-3">
            <User size={45}/>
            Yakka
          </h3>
          <TouchRipple ref={rippleRef2} center={false} />
        </div>

        <div
          onClick={handleRipple}
          className="relative overflow-hidden flex justify-center items-center h-[250px] px-20 bg-[#141f25] rounded-[30px] cursor-pointer hover:bg-[#1d2b33] transition-all duration-300"
        >
          <h3 className="text-[30px] min-[1000px]:text-[40px] text-white leading-[100%] font-bold z-10 flex items-center flex-col gap-3">
            <Users size={45}/>
            Jamoaviy
          </h3>
          <TouchRipple ref={rippleRef} center={false} />
        </div>
      </div>
    </div>
  );
}

export default Page;
