// import React from 'react';
// import './App.css';
// import ChatBot from "react-chatbotify";
// import MyChatbot from './SummerApartment/chatBot'

// // import { Main } from './TanachPrject/Main';
// // import { Main } from './searchInTanach/Main';
import { Main } from './SummerApartment/Main';
// function App() {
//   const flow = {
//     start: {
//       message: "שלום! איך אפשר לעזור לך?",
//       path: "end",
//     },
//     end: {
//       message: "להתראות!",
//     },
//   };
//   return (
//     <div className="App">
//       <Main></Main>
//       <div>
//       <h1>ברוך הבא לאתר שלנו!</h1>
//       <MyChatbot />
//     </div>

//   </div>);
// }

// export default App;
import React from 'react';
import './App.css';
import ChatBot from "react-chatbotify";
import MyChatbot from './SummerApartment/chatBot';
import { ChatBotProvider } from "react-chatbotify";
import MyChatLogic from "./SummerApartment/chatBot";
import OptionMessage from './SummerApartment/optionMassage';

const config = {
  flow: {
    start: {
      message: async (params:any) => {
        await params.injectMessage("שלום! איך אפשר לעזור לך?");
        await params.injectMessage(<OptionMessage />, "bot");
      },
        // path: "options",
    },},
    options: {
      component: <OptionMessage />,
      path: "custom", // אם המשתמש בוחר לא לגעת בכפתור אלא כותב משהו — זה יעבור הלאה
    },
    custom: {
      message: async (params:any, message:any) => {
        await params.injectMessage("רגע, מחפש תשובה...");
        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        const data = await response.json();
        await params.injectMessage(data.reply || "לא קיבלתי תשובה.");
      },
    
      // waitAction: true,
      // action: "handleMessage", // הקוד שלך ל-AI
    },

  
  theme: {
    id: "main-theme",
    layout: "classic",
    accent: "#4CAF50",
  },
  settings: {
    general: {
      flowStartTrigger: "ON_LOAD",
    },
  },
};

function App() {
  return (
    <div className="App">
      <Main></Main>
           <div>

           <ChatBotProvider>
  <MyChatLogic />
  <ChatBot
    flow={config.flow}
    themes={[config.theme]}
    settings={config.settings}
  />
</ChatBotProvider>
    </div></div>
  );
}

export default App;
