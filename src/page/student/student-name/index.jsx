import { useQueryState } from "nuqs";
import Button from "../../../components/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Page() {
  const [roomCode, setRoomCode] = useQueryState("roomCode");
  const [studentName, setQueryName] = useQueryState("name");
  const [teacher, setTeacherName] = useQueryState("teacher");
  const [name, setName] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    const data = localStorage.getItem("studentData");
    const studentData = JSON.parse(data);
    studentData.name = name;
    localStorage.setItem("studentData", JSON.stringify(studentData));

    setQueryName(name);
    setRoomCode(roomCode);
    setTeacherName(teacher);
    navigate(`/students/status`);
  }
  return (
    <div className="main px-10 md:px-20 flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="text-center">
        <h2 className="text-[35px] font-bold mb-10">Ismingizni kiriting</h2>
        <div className="w-full md:w-[400px] mx-auto p-5 bg-white rounded-[10px]">
          <input
            className={
              "border-3 text-[25px] w-full mx-auto block font-bold outline-none rounded-[15px] px-4 py-5 border-[#141f25] mb-8"
            }
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={"Ismingiz"}
          />
          <Button
            type="submit"
            className={
              "w-full bg-[#141f25] text-white cursor-pointer text-[35px]"
            }
          >
            Yuborish
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
