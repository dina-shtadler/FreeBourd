// import { useState } from "react";
// import ChatBot from "react-chatbotify";
// // import "react-chatbotify/dist/main.css";
// export default function Chatbot() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const userMsg = { sender: "user", text: input };
// //     setMessages([...messages, userMsg]);
// //     setInput("");

// //     const res = await fetch("http://localhost:3001/api/chat", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ message: input }),
// //     });

// //     const data = await res.json();
// //     const botMsg = { sender: "bot", text: data.reply };
// //     setMessages((prev) => [...prev, botMsg]);
// //   };

//   return (
// //     <div>
// //       <h3>צ'אט</h3>
// //       <div>
// //         {messages.map((msg, i) => (
// //           <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
// //             <strong>{msg.sender === "user" ? "אתה" : "בוט"}:</strong> {msg.text}
// //           </div>
// //         ))}
// //       </div>
// //       <input
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //       />
// //       <button onClick={sendMessage}>שלח</button>
// //     </div>
// //   );
// //   return (
//     <div style={{ maxWidth: 500, margin: "auto" }}>
//       {/* <ChatBot
//         userMessage={{
//           placeholder: "מה ברצונך לדעת על האתר?",
//         }}
//         botMessage={{
//           loading: "חושב...",
//         }}
//         theme={{
//           primary: "#0052cc",
//           secondary: "#ffffff",
//         }}
//         onSubmit={async (message) => {
//           try {
//             const res = await fetch("http://localhost:3001/api/chat", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ message }),
//             });
//             const data = await res.json();
//             return { type: "text", content: data.reply };
//           } catch (err) {
//             return { type: "text", content: "שגיאה בחיבור לשרת." };
//           }
//         }}
//       /> */}
//     </div>
//   );
// }
import { useEffect, useRef } from "react";
import { useMessages } from "react-chatbotify";

export default function MyChatLogic() {
  const { messages, injectMessage } = useMessages();
  const lastMessageCount = useRef(0);

  // useEffect(() => {
  //   const lastMessage = messages[messages.length - 1];
  //   console.log("messages changed:", messages);
  //   console.log("lastMessage:", lastMessage);

  //   if (
  //     messages.length > lastMessageCount.current &&
  //     lastMessage?.sender === "user"
  //   ) {
  //     console.log("new user message detected, sending to server...");
  //     lastMessageCount.current = messages.length;

  //     const fetchData = async () => {
  //       try {
  //         console.log()
  //         const response = await fetch("http://localhost:3001/api/chat", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ message: lastMessage.text }),
  //         });

  //         const data = await response.json();
  //         injectMessage(data.reply || "לא קיבלתי תשובה.");
  //       } catch (error) {
  //         console.error("שגיאה בתקשורת עם השרת:", error);
  //         injectMessage("שגיאה בתקשורת עם השרת.");
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [messages, injectMessage]);
  useEffect(() => {
   
    const lastMessage = messages[messages.length - 1];
 console.log("אורך ההודעות:", messages.length);
    console.log("lastMessage:", lastMessage);
    console.log("lastMessageCount.current:", lastMessageCount.current);
  
    if (
      messages.length > lastMessageCount.current &&
      lastMessage?.sender  === "USER"
    ) {
      console.log("b")

      lastMessageCount.current = messages.length;

      const fetchData = async () => {
        // מציג הודעת ביניים למשתמש
        await injectMessage("רגע, מחפש תשובה...");

        try {
          const response = await fetch("https://advertismentfree.onrender.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: lastMessage.text }),
          });

          const data = await response.json();
          await injectMessage(data.reply || "לא קיבלתי תשובה.");
        } catch (error) {
          console.error("שגיאה בתקשורת עם השרת:", error);
          await injectMessage("שגיאה בתקשורת עם השרת.");
        }
      };

      fetchData();
    }
  }, [messages, injectMessage]);

  return null;
}
