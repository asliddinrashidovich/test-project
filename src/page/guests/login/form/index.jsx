import { Link, NavLink } from "react-router-dom";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

function FormContent() {
  return (
    <form className="">
      <h1 className="text-white text-[38px] font-medium mb-20">Kirish</h1>
      <Input
        placeholder={"Telefon raqamingiz"}
        className={`text-white mb-10 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Input
        placeholder={"Parol o’ylab toping"}
        className={`text-white mb-10 w-full`}
        type={"text"}
        onChange={(e) => console.log(e)}
      />
      <Button className="w-full bg-white mb-10 cursor-pointer">Kirish</Button>
      <a href="/sign-up" className="text-white">
        Ro’yhatdan o’tish
      </a>
    </form>
  );
}

export default FormContent;
