// // import { createApartment, getAllCities, getAllKategorys,AddCity } from "./api"
// // import { useEffect, useState } from "react"
// // import swal from "sweetalert"

// // export const AddApartments = () => {
// //     debugger
// //     const [listCities, setList] = useState()
// //     const [city, setCity] = useState()
// //     const [Kategory, setKategory] = useState()
// //     const [Kategory1, setKategory1] = useState()


// //     const [listKategories, setListK] = useState()
// //     const [image, setImage] = useState({});
// //     const handleImageChange = (event) => {
// //         setImage(event.target.files[0]);
// //     };
// //     useEffect(() => {

// //      getAllCities() 
// //            .then(x => {
// //                 console.log(x);
// //                setList(x.data.cities)
// //             })
// //             .catch(err => {
// //                 console.log(err);
// //             })
// //     }, [])
// //     useEffect(() => {

// //         getAllKategorys() 
// //               .then(x => {
// //                    console.log(x);
// //                   setListK(x.data.kategorys)
// //                })
// //                .catch(err => {
// //                    console.log(err);
// //                })
// //        }, [])
// //        const send = (event) => {
// //         event.preventDefault()
// //         debugger
// // listKategories.map((x)=>{
// //     debugger
// //     console.log(x)
// //     if(x.nameKategory==Kategory)
// //     {setKategory1(x._id)
// //     console.log(x)}


// // const formData = new FormData();
// // // 2 שכונה 
// // // 3 רחוב 
// // // 4 מספר בניין 
// // // 5 מספר חדרים 
// // // 6 מ"ר 
// // // 7 מרפסת
// // // 8 מ"ר מרפסת
// // // 9 מחיר 

// //  debugger
// //         formData.append('neighbourhood', event.target[0].value);
// //        formData.append('picture', image);
// //        formData.append('street', event.target[2].value);
// //         formData.append('numBuild', event.target[3].value);
// //         formData.append('price', event.target[4].value);
// //         formData.append('squareMeter', event.target[5].value);
// //         formData.append('numRooms', event.target[6].value);
// //         formData.append('porch', event.target[7].value);
// //         formData.append('porchSquareMeter', event.target[8].value);
// //         formData.append('realEstateAgency', event.target[9].value);
// //       Kategory1&&formData.append('kodKategory',Kategory1);
// //        city&&formData.append('kodCity', city);
// //         formData.append('kodPublisher', localStorage.getItem(`user`));
// //         console.log(formData.get('kodKategory'));
      
// //     console.log(formData)
// //     createApartment(localStorage.getItem(`user`),formData)
// //     .then(x => {
// //         console.log(x.data);
// //     //    if (register.message=='welcome to our application!'){
// //     //     setlogin(Publisher)
// //        swal( `🤭🤭🤭 success`);
// //   //  
// // //   }
// // //       else if(register.data.message==`email has been exists already!`)
// // //       swal( `🤭🤭🤭 email has been exists already!`);
// //     })
// //     .catch(err => {
// //         console.log(err);
// //        if(err.response.data.message=="Authorization failed!")
// //         alert("אופסס, את/ה לא מחוחבר!!!😟")
// //     })
// //   })  }
// //     const   Add=(e)=>{
// //       console.log(e)
// //     AddCity(localStorage.getItem(`user`),e)
// //     .then(x => {
// //       console.log(x.data);
  
// //      swal( `🤭🤭🤭 success`);
// //  })
// //   .catch(err => {
// //       console.log(err);
// //   })
// //     }
// //     return<>
// //     <h1>הוספת דירה למאגר</h1>
// //     {/* <h3> <select required onChange={(e) => setCity(e.target.value)} >
// //     {listCities&& listCities.map((x)=><>    
// //             <option key={'none'} disabled selected>{'select Cityies'}</option>
// //       {/* <option >{x.}</option> */}
// //       {/* </>)}  </select>בחר עיר <input placeholder="אחר" onBlur={(e)=>Add(e.target.value)}></input> </h3>
// //        */}

// //       <h3> <select required onChange={(e) => setKategory(e.target.value)} >
   
// //     {listKategories&& listKategories.map((x)=><>    
// //             <option key={'none'} disabled selected>{'select Kategory'}</option>
            
// //       <option onChange={(e) => setKategory1(x)} >{x.nameKategory}</option>
// //       </>)}  </select>בחר קטגוריה </h3>
      
      
// //        <form id='t' action="./addApartment" onSubmit={(e) => send(e)}>
// //       <div class="input-container">
// //     <i class="fa fa-user icon"></i>
// //     <input class="input-field" type="text" placeholder='שכונה' name="neighbourhood" required></input>
// //   </div>
  
// // {/* <div className={'link'}>{thisuser[0].FirstName}</div><br></br> */}
// //   <div class="input-container">
// //     <i class="fa fa-user icon" htmlFor="apartment-image"></i>

// //     <input class="input-field"  placeholder="picture" name="picture"  id="apartment-image" 
// //                                 type="file" 
// //                                 onChange={handleImageChange} 
// //                                 required></input>
// //   </div>
// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="רחוב" name="street" required></input>
// //   </div>
// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="מס בניין" name="numBuild" required></input>
// //   </div>
// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="price" name="price" required></input>
// //     </div>
// //   <div class="input-container">
// //     <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="מטר רבוע" name="quareMeter" required></input>
// //   </div>
// //   </div>
// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="מס חדרים" name="numRooms" required></input>
// //   </div>

// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="checkbox" placeholder=" מרפסות" name="porch" required></input>
// //   </div>

// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="text" placeholder="מטר רבוע למרפסות" name="porchSquareMeter" required></input>
// //   </div>

// //   <div class="input-container">
// //     <i class="fa fa-envelope icon"></i>
// //     <input class="input-field" type="checkbox" placeholder="תיווך?"name="realEstateAgency" required></input>
// //   </div>
     
// //   <button type="submit" class="btn" >שלח</button>

// // </form >

// //     </>}















// // // import './addapartment.css'

// // // import { createApartment, getAllCities, getAllKategorys, AddCity } from "./api";
// // // import { useEffect, useState } from "react";
// // // import swal from "sweetalert";

// // // export const AddApartments = () => {
// // //   const [listCities, setList] = useState([]);
// // //   const [city, setCity] = useState();
// // //   const [Kategory, setKategory] = useState();
// // //   const [Kategory1, setKategory1] = useState();
// // //   const [listKategories, setListK] = useState([]);
// // //   const [image, setImage] = useState({});

// // //   // פונקציה להעלאת תמונה
// // //   const handleImageChange = (event) => {
// // //     setImage(event.target.files[0]);
// // //   };

// // //   // פעולה שלקיחת הערים
// // //   useEffect(() => {
// // //     getAllCities()
// // //       .then((response) => {
// // //         setList(response.data.cities);
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //       });
// // //   }, []);

// // //   // פעולה שלקיחת הקטגוריות
// // //   useEffect(() => {
// // //     getAllKategorys()
// // //       .then((response) => {
// // //         setListK(response.data.kategorys);
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //       });
// // //   }, []);

// // //   // שליחת הנתונים
// // //   const send = (event) => {
// // //     event.preventDefault();

// // //     // חיפוש הקטגוריה שנבחרה
// // //     const selectedCategory = listKategories.find((x) => x.nameKategory === Kategory);
// // //     if (selectedCategory) {
// // //       setKategory1(selectedCategory._id);
// // //     }

// // //     // יצירת FormData לשליחת המידע
// // //     const formData = new FormData();
// // //     formData.append("nameApartment", event.target[0].value);
// // //     formData.append("describe", event.target[2].value);
// // //     formData.append("picture", image);
// // //     formData.append("adress", event.target[3].value);
// // //     formData.append("price", event.target[4].value);
// // //     formData.append("extras", event.target[5].value);
// // //     formData.append("numRooms", event.target[6].value);
// // //     if (Kategory1) formData.append("kodKategory", Kategory1);
// // //     if (city) formData.append("kodCity", city);
// // //     formData.append("kodPublisher", localStorage.getItem("user"));

// // //     // יצירת הדירה
// // //     createApartment(localStorage.getItem("user"), formData)
// // //       .then(() => {
// // //         swal("🤭🤭🤭 success");
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //       });
// // //   };

// // //   // הוספת עיר חדשה
// // //   const Add = (newCity) => {
// // //     AddCity(localStorage.getItem("user"), newCity)
// // //       .then(() => {
// // //         swal("🤭🤭🤭 success");
// // //       })
// // //       .catch((err) => {
// // //         console.error(err);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <h1>הוספת דירה למאגר</h1>

// // //       {/* בחירת קטגוריה */}
// // //       <h3>
// // //         <select className="input-field" required onChange={(e) => setKategory(e.target.value)}>
// // //           <option key="none" disabled selected>
// // //             בחר קטגוריה
// // //           </option>
// // //           {listKategories &&
// // //             listKategories.map((category) => (
// // //               <option key={category._id} value={category.nameKategory}>
// // //                 {category.nameKategory}
// // //               </option>
// // //             ))}
// // //         </select>
// // //       </h3>

// // //       {/* טופס הוספת דירה */}
// // //       <form id="t" onSubmit={send}>
// // //         <div className="input-container">
// // //           <input className="input-field" type="text" placeholder="שם הדירה" required />
// // //         </div>

// // //         {/* בחירת תמונה */}
// // //         <div className="input-container">
// // //           <input
// // //             className="input-field"
// // //             type="file"
// // //             id="apartment-image"
// // //             onChange={handleImageChange}
// // //             required
// // //           />
// // //         </div>

// // //         {/* תיאור הדירה */}
// // //         <div className="input-container">
// // //           <input className="input-field" type="text" placeholder="תיאור" required />
// // //         </div>

// // //         {/* כתובת הדירה */}
// // //         <div className="input-container">
// // //           <input className="input-field" type="text" placeholder="כתובת" required />
// // //         </div>

// // //         {/* מחיר */}
// // //         <div className="input-container">
// // //           <input className="input-field" type="text" placeholder="מחיר" required />
// // //         </div>

// // //         {/* תוסxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-field" type="text" placeholder="תוספות" required />
// // //         </div>

// // //         {/* מספר חדרים */}
// // //         <div className="input-container">
// // //           <input className="input-field" type="text" placeholder="מספר חדרים" required />
// // //         </div>

// // //         {/* כפתור שליחה */}
// // //         <button type="submit" className="btn">
// // //           שלח
// // //         </button>
// // //       </form>
// // //     </>
// // //   );
// // // };

import { createApartment, getAllCities, getAllKategorys, AddCity } from "./api";
import { useEffect, useState } from "react";
import swal from "sweetalert";

// export const AddApartments = () => {
//   const [listCities, setList] = useState([]);
//   const [city, setCity] = useState();
//   const [Kategory, setKategory] = useState();
//   const [Kategory1, setKategory1] = useState();
//   const [listKategories, setListK] = useState([]);
//   const [image, setImage] = useState({});

//   // פונקציה להעלאת תמונה
//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   // פעולה שלקיחת הערים
//   useEffect(() => {
//     getAllCities()
//       .then((response) => {
//         setList(response.data.cities);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   // פעולה שלקיחת הקטגוריות
//   useEffect(() => {
//     getAllKategorys()
//       .then((response) => {
//         setListK(response.data.kategorys);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   // שליחת הנתונים
//   const send = (event) => {
//     event.preventDefault();

//     // חיפוש הקטגוריה שנבחרה
//     const selectedCategory = listKategories.find((x) => x.nameKategory === Kategory);
//     if (selectedCategory) {
//       setKategory1(selectedCategory._id);
//     }

//     // יצירת FormData לשליחת המידע
//     const formData = new FormData();
//     formData.append("neighbourhood", event.target[0].value);
//     formData.append("picture", image);
//     formData.append("street", event.target[2].value);
//     formData.append("numBuild", event.target[3].value);
//     formData.append("price", event.target[4].value);
//     formData.append("squareMeter", event.target[5].value);
//     formData.append("numRooms", event.target[6].value);
//     formData.append("porch", event.target[7].value);
//     formData.append("porchSquareMeter", event.target[8].value);
//     formData.append("realEstateAgency", event.target[9].value);

//     if (Kategory1) formData.append("kodKategory", Kategory1);
//     if (city) formData.append("kodCity", city);
//     formData.append("kodPublisher", localStorage.getItem("user"));

//     console.log(formData); // ניתן להוסיף כאן לוג למעקב

//     // יצירת הדירה
//     createApartment(localStorage.getItem("user"), formData)
//       .then((response) => {
//         swal("🤭🤭🤭 success");
//       })
//       .catch((err) => {
//         console.error(err);
//         if (err.response.data.message === "Authorization failed!") {
//           alert("אופסס, את/ה לא מחוחבר!!!😟");
//         }
//       });
//   };

//   // הוספת עיר חדשה
//   const Add = (newCity) => {
//     AddCity(localStorage.getItem("user"), newCity)
//       .then(() => {
//         swal("🤭🤭🤭 success");
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <>
//       <h1>הוספת דירה למאגר</h1>

//       {/* בחירת קטגוריה */}
//       <h3>
//         <select className="input-field" required onChange={(e) => setKategory(e.target.value)}>
//           <option key="none" disabled selected>
//             בחר קטגוריה
//           </option>
//           {listKategories &&
//             listKategories.map((category) => (
//               <option key={category._id} value={category.nameKategory}>
//                 {category.nameKategory}
//               </option>
//             ))}
//         </select>
//       </h3>

//       {/* טופס הוספת דירה */}
//       <form id="t" onSubmit={send}>
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="שכונה" required />
//         </div>

//         {/* בחירת תמונה */}
//         <div className="input-container">
//           <input
//             className="input-field"
//             type="file"
//             id="apartment-image"
//             onChange={handleImageChange}
//             required
//           />
//         </div>

//         {/* תיאור הדירה */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="רחוב" required />
//         </div>

//         {/* כתובת הדירה */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="מס בניין" required />
//         </div>

//         {/* מחיר */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="מחיר" required />
//         </div>

//         {/* מטר רבוע */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="מטר רבוע" required />
//         </div>

//         {/* מספר חדרים */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="מס חדרים" required />
//         </div>

//         {/* מרפסות */}
//         <div className="input-container">
//           <input className="input-field" type="checkbox" placeholder=" מרפסות" required />
//         </div>

//         {/* מטר רבוע למרפסת */}
//         <div className="input-container">
//           <input className="input-field" type="text" placeholder="מטר רבוע למרפסת" required />
//         </div>

//         {/* תיווך */}
//         <div className="input-container">
//           <input className="input-field" type="checkbox" placeholder="תיווך?" required />
//         </div>

//         <button type="submit" className="btn">
//           שלח
//         </button>
//       </form>
//     </>
//   );
// };
export const AddApartments = () => {
  const [listCities, setList] = useState([]);
  const [city, setCity] = useState();
  const [Kategory, setKategory] = useState();
  const [Kategory1, setKategory1] = useState();
  const [listKategories, setListK] = useState([]);
  const [image, setImage] = useState({});
  const currentDate = new Date().toISOString().split('T')[0]; // התאריך היום
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0]; // התאריך אחרי 30 יום
  const handleImageChange = (event) => {
      setImage(event.target.files[0]);
  };

  useEffect(() => {
      getAllCities()
          .then((response) => {
              setList(response.data.cities);
          })
          .catch((err) => {
              console.error(err);
          });
  }, []);

  useEffect(() => {
      getAllKategorys()
          .then((response) => {
              setListK(response.data.kategorys);
          })
          .catch((err) => {
              console.error(err);
          });
  }, []);

  const send = (event) => {
      event.preventDefault();

    

      const formData = new FormData();
      formData.append("neighbourhood", event.target[0].value);
      formData.append("floor", event.target[1].value);
      formData.append("street", event.target[2].value);
      formData.append("numBuild", event.target[3].value);
      formData.append("price", event.target[4].value);
      formData.append("squareMeter", event.target[5].value);
      formData.append("numRooms", event.target[6].value);
      formData.append("porch", event.target[7].value);
      formData.append("porchSquareMeter", event.target[8].value);
      formData.append("realEstateAgency", event.target[9].value);
      formData.append("city", event.target[10].value);
      formData.append("datend", event.target[11].value);
      console.log("describe", event.target[12].value)
      const selectedCategory = listKategories.find((x) => x.nameKategory === Kategory);
      if (selectedCategory) {
        console.log(Kategory);
          setKategory1(selectedCategory._id);
          console.log(Kategory1)
      }
      if (Kategory1) formData.append("kodKategory", selectedCategory._id);
      if (city) formData.append("kodCity", city);
      formData.append("kodPublisher", localStorage.getItem("user"));

      createApartment(localStorage.getItem("user"), formData)
          .then(() => {
              swal("🤭🤭🤭 success");
          })
          .catch((err) => {
              console.error(err);
          });
  };

  const Add = (newCity) => {
      AddCity(localStorage.getItem("user"), newCity)
          .then(() => {
              swal("🤭🤭🤭 success");
          })
          .catch((err) => {
              console.error(err);
          });
  };
  const [inputText, setInputText] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;

    // מחלק את הטקסט למילים ומוודא שיש לא יותר מ-10 מילים
    const words = value.trim().split(/\s+/); // מפריד לפי רווחים או רווחים מרובים
    if (words.length <= 10) {
      setInputText(value);
    }}

  return (
      <>
          <h1>הוספת דירה למאגר</h1>

          {/* בחירת קטגוריה */}
          <h3>
              <select className="input-field" required onChange={(e) => setKategory(e.target.value)}>
                  <option key="none" disabled selected>
                      בחר קטגוריה
                  </option>
                  {listKategories &&
                      listKategories.map((category) => (
                          <option key={category._id} value={category.nameKategory}>
                              {category.nameKategory}
                          </option>
                      ))}
              </select>
          </h3>

          {/* טופס הוספת דירה */}
          <form id="t" onSubmit={send}>
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="שכונה" name="neighbourhood" required />
              </div>

              {/* בחירת תמונה */}
              <div className="input-container">
                  <input
                      className="input-field"
                      type="text"
placeholder="קומה"          name="floor"            required
                  />
              </div>

              <div className="input-container">
                  <input className="input-field" type="text" placeholder="רחוב" name="street" required />
              </div>

              {/* מספר בניין */}
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="מס בניין" name="numBuild" required />
              </div>

              {/* מחיר */}
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="מחיר" name="price" required />
              </div>

              {/* מטר רבוע */}
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="מטר רבוע" name="squareMeter" required />
              </div>

              {/* מספר חדרים */}
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="מס חדרים" name="numRooms" required />
              </div>

              {/* מרפסת */}
              <div className="input-container">
                 מרפסת? <input className="input-field" type="checkbox" name="porch"  />
              </div>

              {/* מטר רבוע למרפסות */}
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="מטר רבוע למרפסת" name="porchSquareMeter" required />
              </div>

              {/* תיווך */}
              <div className="input-container">
                 תיווך <input className="input-field" type="checkbox" name="realEstateAgency"  />
              </div>
              <div className="input-container">
                  <input className="input-field" type="text" placeholder="עיר" name="city" required />
              </div>
              <div className="input-container">
                <label>פירסום עד:</label>
              <input 
        type="date" 
        required
        id="date" 
        name="datend" 
        min={currentDate} // תאריך מינימלי - היום
        max={maxDateString} // תאריך מקסימלי - 30 יום קדימה
      /></div>
          <div className="input-container">
                  <input className="input-field" type="text"   value={inputText}
        onChange={handleChange} placeholder="פרטים נוספים" name="describe" required />
              </div>
              <button type="submit" className="btn">
                  שלח
              </button>
          </form>
      </>
  );
};
