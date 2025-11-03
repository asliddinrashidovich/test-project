import Button from "../../../components/button";

function Page() {
  return (
    <div className="main px-10 md:px-20 flex items-center justify-center h-screen">
      <form className="text-center">
        <h2 className="text-[35px] font-bold mb-10">
          Kirish uchun kodni kiriting
        </h2>
        <div className="w-full md:w-[400px] mx-auto p-5 bg-white rounded-[10px]">
          <input
            className={
              "border-3 text-[25px] w-full mx-auto block font-bold outline-none rounded-[15px] px-4 py-5 border-[#141f25] mb-8"
            }
            placeholder={"kod"}
          />
          <Button
            onClick={() => navigate("/dashboard/individual/status")}
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
