// import React from 'react';
 import './App.css';
// import ChatBot from "react-chatbotify";
// import MyChatbot from './SummerApartment/chatBot'
import { createContext } from 'react';


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
import { Wireframe } from './SummerApartment/screens/Wireframe';
import { AllApartments } from './SummerApartment/screens/allApartments';
import { getAllApartment, } from "../src/SummerApartment/api";
import  { useEffect, useState } from 'react';

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
        const response = await fetch("http://sarsoor.org/api/chat", {
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
 const [all, setAll] = useState([]);
  const [forSale, setForSale] = useState([]);
  const [forRent, setForRent] = useState([]);
  const [forVacation, setForVacation] = useState([]);
  const [name, setName] = useState(null);


    useEffect(() => {
      getAllApartment()
          .then(x => { 
             const filteredApartments3 = x.data.apartmens
             const filteredApartments1 = x.data.apartmens.filter( (item:any)=> item.kodKategory[0]?.nameKategory === 'להשכרה'&&  (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
           const filteredApartments = x.data.apartmens.filter((item:any) => item.kodKategory[0]?.nameKategory === 'למכירה' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
           const filteredApartments2 =  x.data.apartmens.filter((item:any) => item.kodKategory[0]?.nameKategory === 'נופש שבתות וחגים' && (!item.datend || new Date(item.datend).getTime() >= new Date().setHours(0, 0, 0, 0))); // אם אין datend או אם datend קטן או שווה להיום
           
           setAll(filteredApartments3);
             setForSale(filteredApartments)
             setForRent(filteredApartments1)
             setForVacation(filteredApartments2)
              console.log("listApartment", filteredApartments);
          })
          .catch(err => {
              console.log(err);
          });
  }, []);
  return (
        <GlobalDataContext.Provider value={{all,forSale,forRent,forVacation,name}}>

    <div >
   
   {/* <Wireframe></Wireframe> */}
   {/* <AllApartments></AllApartments> */}
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
        </GlobalDataContext.Provider>

  );
}

export default App;
export  const GlobalDataContext = createContext({
  all:[],
  forSale:[],
  forRent: [],
  forVacation: [],
  name: null,
  // setName: () => {},
});