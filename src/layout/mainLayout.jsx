import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import {GalleryVerticalEnd, PackagePlus, PanelLeft, User, Users} from "lucide-react"

function MainLayout() {
  const navigate = useNavigate();
  const url = useLocation();
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { path: "/dashboard", label: "Boshqaruv", icon: PackagePlus },
    { path: "/profile", label: "Profil", icon: User },
    { path: "/students", label: "O‘quvchilar", icon: Users },
    { path: "/arxiv", label: "Arxiv", icon: GalleryVerticalEnd },
  ];

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="relative">
      <div className={`bg-[#141f25] ${isOpen ? "w-20 md:w-60" : "w-0 md:w-20"} bottom-0 left-0 top-0 fixed transition-all duration-200 z-20`}>
        <button onClick={handleToggle} className="-right-7 z-20 top-5 cursor-pointer absolute">
          <PanelLeft size={20} className="cursor-pointer"/>
        </button>
        <div onClick={() => navigate("/")} className={`${isOpen ? "px-2 md:px-0" : "px-2"} h-12 my-5 cursor-pointer`}>
          <img
            className="w-[170px] mx-auto h-full object-cover"
            src="/logo.png"
            alt="logo"
          />
        </div>

        <div className={`${isOpen ? "px-2 md:px-6" : "px-0 md:px-2 hidden md:flex"} flex flex-col gap-[5px]`}>
          {links.map(({ path, label, icon: Icon }) => {
            const isActive = url.pathname.split("/").slice(0,2).join("/") === path;
            const rippleRef = useRef(null);

            return (
              <div
                key={path}
                onClick={(e) => {
                  rippleRef.current?.start(e);
                  navigate(path);
                  setTimeout(() => rippleRef.current?.stop(e), 300);
                }}
                className={`relative overflow-hidden w-full py-3 px-5 rounded-[7px] cursor-pointer transition-all duration-300 flex ${isOpen ? "md:justify-start justify-center" : "justify-center"} gap-2 items-center ${
                  isActive
                    ? "bg-[#86868631] text-[#1768dd]"
                    : "hover:bg-[#86868610] text-white"
                }`}
              >
                {<Icon size={20}/>}
                {isOpen && <p className={`text-[20px] font-medium leading-[100%] hidden md:flex`}>
                  {label}
                </p>}
                <TouchRipple ref={rippleRef} center={false} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={`min-h-screen main transition-all duration-200 relative ${isOpen ? "w-[calc(100vw-80px)] md:w-[calc(100vw-240px)]" : "w-full md:w-[calc(100vw-80px)]"} ml-auto`}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
