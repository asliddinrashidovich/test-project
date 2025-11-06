import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../../components/input";

function Page() {
  const accessToken = useAuthStore((store) => store.accessToken);
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(res?.data?.data);
      } catch (err) {
        toast.error(err?.response?.data?.message ?? "Something went wrong!");
      }
    };
    getData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/api/user/change-password", {currentPassword, newPassword}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Parol muvafiqiyatli o'zgardi")
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong!");
    }
  };
  return (
    <div className=" py-10 px-10 lg:px-20 flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto w-full p-7 bg-[#141f25] rounded-[30px] mb-30">
        <h3 className="text-[35px] leading-[100%] font-bold text-center text-white">
          Profile
        </h3>
      </div>
      <div className="max-w-[1000px] mx-auto w-full flex items-center justify-center">
        <div className="w-full">
          <div className="flex w-full  py-10 px-10  bg-[#141f25] rounded-[30px] cursor-pointer flex-col">
            <h3 className="text-[25px] text-start text-white leading-[100%] font-bold mb-5 z-10">
              Ismi: <span className="font-normal">{data?.name}</span>
            </h3>
            <h3 className="text-[25px] text-start text-white leading-[100%] font-bold mb-5 z-10">
              Familiyasi: <span className="font-normal">{data?.surname}</span>
            </h3>
            <h3 className="text-[25px] text-start text-white leading-[100%] font-bold mb-5 z-10">
              Telefon raqam:{" "}
              <span className="font-normal">{data?.phoneNumber}</span>
            </h3>
            <div
              onClick={() => setShowForm(prev => !prev)}
              className="border w-[200px] mb-4 border-white text-white p-2 rounded-[5px]"
            >
              <h4 className="">Parolni o'zgartirish</h4>
            </div>
            {showForm && (
              <form onSubmit={onSubmit}>
                <Input
                  placeholder="Hozirgi parol"
                  className="text-white w-full mb-4"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  placeholder="Hozirgi parol"
                  className="text-white w-full mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="p-3 bg-blue-500 rounded-[10px] text-white">
                  O'zgartirish
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
