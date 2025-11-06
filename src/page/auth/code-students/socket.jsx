import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://138.68.100.215:3000", {
  transports: ["websocket"],
});

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket ulandi:", socket.id);
      console.log("Foydalanuvchi ulandi:", socket.id);
      socket.emit("joinRoom", {roomCode: "7217", name: "asliddin"})
      socket.on("studentListUpdate", (data) => {
        setStudents(data.students); 
        console.log(data)
      })
  
      socket.on("disconnect", () => {
        console.log("Foydalanuvchi chiqdi:", socket.id);
      });
    });


    socket.on("error", (err) => {
      console.error("⚠️ Socket xato:", err);
    });

    return () => {
      socket.off("studentListUpdate");
      socket.off("error");
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">👨‍🎓 Guruhdagi studentlar</h2>
      {students?.length === 0 ? (
        <p>Hozircha studentlar yo‘q...</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {students.length && students?.map((student, i) => (
            <li key={i}>{student.name || ""}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
