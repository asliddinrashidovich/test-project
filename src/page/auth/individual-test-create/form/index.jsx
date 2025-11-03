import Input from "../../../../components/input";
import Button from "../../../../components/button";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

function FormContent() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/dashboard/individual/start");
  };
  return (
    <form onSubmit={handleCreate}>
      <label htmlFor="questionName">
        <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
          Savol matnini kiriting
        </span>
        <Input
          id="questionName"
          name={"questionName"}
          placeholder={"Savol"}
          className={`text-white mb-10 w-full`}
          type={"text"}
          onChange={(e) => console.log(e)}
        />
      </label>
      <div className="relative mb-[27px]">
        <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
          Javob varyantlarni kiriting
        </span>
        <div className="flex border-white border-2 pr-3 rounded-[10px] items-center justify-between">
          <Input
            id="questionOption"
            name={"questionName"}
            placeholder={`Variyant-${1}`}
            className={`text-white w-full border-none`}
            type={"text"}
            onChange={(e) => console.log(e)}
          />
          <p className="text-[25px]  text-white">A</p>
        </div>
      </div>
      <div className="flex border-white border-2 pr-3 rounded-[10px] items-center justify-between mb-[27px]">
        <Input
          id="questionOption"
          name={"questionName"}
          placeholder={`Variyant-${1}`}
          className={`text-white w-full border-none`}
          type={"text"}
          onChange={(e) => console.log(e)}
        />
        <p className="text-[25px]  text-white">B</p>
      </div>
      <Button
        className={"border w-full border-white text-white cursor-pointer mb-10"}
        type="button"
      >
        Varyant qo’shish +
      </Button>
      <div className="options mb-8">
        <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
          To’g’ri javobni tanlang
        </span>
        <Select
          placeholder={"Tanlash"}
          onChange={(e) => console.log(e)}
          className="w-full border border-white rounded-[10px] bg-transparent"
          style={{ width: "100%", background: "black !important" }}
          options={[
            { value: "1", label: <span className="">Option 1</span> },
            { value: "2", label: <span>Option 2</span> },
          ]}
        />
      </div>
      <Button className="w-full bg-white mb-10 cursor-pointer">
        KEYINGI BOSQICH
      </Button>
    </form>
  );
}

export default FormContent;
