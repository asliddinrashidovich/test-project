import { Link, NavLink } from "react-router-dom";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

function FormContent() {
  return (
    <form className="">
      <h1 className="text-white text-[38px] font-medium mb-10">
        Ro’yhatdan o’tish
      </h1>
      <Input
        placeholder={"Ismingiz"}
        className={`text-white mb-7 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Input
        placeholder={"Familiyangiz"}
        className={`text-white mb-7 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Input
        placeholder={"Telefon raqamingiz"}
        className={`text-white mb-7 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Input
        placeholder={"Parol o’ylab toping"}
        className={`text-white mb-7 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Input
        placeholder={"Parolni tasdiqlang"}
        className={`text-white mb-7 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Button className="w-full bg-white mb-9 cursor-pointer">Kirish</Button>
      <a href="/login" className="text-white">Avval ro’yhatdan o’tganmisiz? <span className={"text-blue-500"} to={"sign-up"}>Login</span></a>
    </form>
  );
}

export default FormContent;
