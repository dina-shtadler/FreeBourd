// import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"

// import {  getAllCities, getAllKategorys, updateApartment } from "./api"
// import { useEffect, useState } from "react"
// import swal from "sweetalert"

// export const UpdateApartment = () => {
//     debugger
    
//     const [Kategory, setKategory] = useState()
//     const [Kategory1, setKategory1] = useState()


//     const [listKategories, setListK] = useState()
//     const [image, setImage] = useState({});
//     const handleImageChange = (event) => {
//         setImage(event.target.files[0]);
//     };
// const thisApartment= localStorage.getItem(`thisApartment`)
// const thisApartment1=JSON.parse(thisApartment)
//    console.log(thisApartment1.numBeds)
//     useEffect(() => {

//         getAllKategorys() 
//               .then(x => {
//                    console.log(x);
//                   setListK(x.data.kategorys)
//                })
//                .catch(err => {
//                    console.log(err);
//                })
//        }, [])
//        const send = (event) => {
//         event.preventDefault()
//         debugger
// listKategories.map((x)=>{
//     debugger
//     console.log(x)
//     if(x.nameKategory==Kategory)
//     {setKategory1(x._id)
//     console.log(x)}
// })
//     const Apartment =  {
//       _id:thisApartment1._id,
//         nameApartment: event.target[0].value,
//         // picture: event.target[1].value,
//         describe: event.target[2].value,
//         adress: event.target[3].value,
//         price: event.target[4].value,
//         extras: event.target[5].value,
//         numBeds: event.target[6].value,
//         kodKategory:Kategory1,
//        kodPublisher:localStorage.getItem(`user`)        
//     }
//     console.log(thisApartment1._id)
//     updateApartment(localStorage.getItem(`user`),Apartment)
//     .then(x => {
//         console.log(x.data);
//     //    if (register.message=='welcome to our application!'){
//     //     setlogin(Publisher)
//        swal( `🤭🤭🤭 success`);
//   //  
// //   }
// //       else if(register.data.message==`email has been exists already!`)
// //       swal( `🤭🤭🤭 email has been exists already!`);
//     })
//     .catch(err => {
//         console.log(err);
//     })
//        }
//     return<>
//     <h1>עדכון פרטי הדירה</h1>
    
//       <h3> <select required onChange={(e) => setKategory(e.target.value)} >
   
//     {listKategories&& listKategories.map((x)=><>    
//             <option key={'none'} disabled selected>{'select kategory'}</option>
            
//       <option >{x.nameKategory}</option>
//       </>)} </select>בחר קטגוריה </h3>
      
      
//        <form id='t' action="./addApartment" onSubmit={(e) => send(e)}>
//       <div class="TextField-container">
//     <i class="fa fa-user icon"></i>
//     <TextField class="TextField-field" type="text" value={thisApartment1.nameApartment} name="nameApartment"></TextField>
//   </div>
  
// {/* <div className={'link'}>{thisuser[0].FirstName}</div><br></br> */}
//   <div class="TextField-container">
//     <i class="fa fa-user icon"></i>
//     <TextField class="TextField-field"  value="picture" name="picture"  id="apartment-image" 
//                                 type="file" 
//                                 onChange={handleImageChange} 
//                                 required></TextField>
//     </div>
//     <div class="TextField-container">
//     <i class="fa fa-envelope icon"></i>
//     <TextField class="TextField-field" type="text" value="describe" name="describe" required></TextField>
//   </div>
//   <div class="TextField-container">
//     <i class="fa fa-envelope icon"></i>
//     <TextField class="TextField-field" type="text" value={thisApartment1.adress} name="adress" ></TextField>
//   </div>
//   <div class="TextField-container">
//     <i class="fa fa-envelope icon"></i>
//     <TextField class="TextField-field" type="text" value={thisApartment1.price} name="price" ></TextField>
//     </div>
//   <div class="TextField-container">
//     <div class="TextField-container">
//     <i class="fa fa-envelope icon"></i>
//     <TextField class="TextField-field" type="text" value={thisApartment1.extras} name="extras" ></TextField>
//   </div>
//   </div>
//   <div class="TextField-container">
//     <i class="fa fa-envelope icon"></i>
//     <TextField class="TextField-field" type="text" value={thisApartment1.numBeds} name="numBeds" ></TextField>
//   </div>
     
//   <button type="submit" class="btn" >שלח</button>

// </form >

//     </>}

// import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
// import { getAllCities, getAllKategorys, updateApartment } from "./api"
// import { useEffect, useState } from "react"
// import swal from "sweetalert"

// export const UpdateApartment = () => {
//     const [Kategory, setKategory] = useState()
//     const [Kategory1, setKategory1] = useState()
//     const [listKategories, setListK] = useState()
//     const [image, setImage] = useState(null)

//     const handleImageChange = (event) => {
//         setImage(event.target.files[0])
//     }

//     const thisApartment = localStorage.getItem(`thisApartment`)
//     const thisApartment1 = JSON.parse(thisApartment)
//     console.log(thisApartment1.numBeds)

//     useEffect(() => {
//         getAllKategorys()
//             .then(x => {
//                 console.log(x)
//                 setListK(x.data.kategorys)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, [])

//     const send = (event) => {
//         event.preventDefault()
        
//         // קביעת קטגוריה
//         listKategories.map((x) => {
//             if (x.nameKategory === Kategory) {
//                 setKategory1(x._id)
//             }
//         })

//         const Apartment = {
//             _id: thisApartment1._id,
//             adress: event.target.adress.value,
//             price: event.target.price.value,
//             extras: event.target.extras.value,
//             kodKategory: Kategory1,
//             kodPublisher: localStorage.getItem(`user`),
//             city: event.target.city.value,
//             neighbourhood: event.target.neighbourhood.value,
//             street: event.target.street.value,
//             numBuild: event.target.numBuild.value,
//             numRooms: event.target.numRooms.value,
//             squareMeter: event.target.squareMeter.value,
//             porch: event.target.porch.value,
//             porchSquareMeter: event.target.porchSquareMeter.value,
//             realEstateAgency: event.target.realEstateAgency.value
//         }

//         console.log(Apartment)

//         updateApartment(localStorage.getItem(`user`), Apartment)
//             .then(x => {
//                 console.log(x.data)
//                 swal(`🤭🤭🤭 success`)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     return (
//         <>
//             <h1>עדכון פרטי הדירה</h1>

//             <h3> <select required onChange={(e) => setKategory(e.target.value)}>
//                 {listKategories && listKategories.map((x) => (
//                     <>
//                         <option key={x._id} value={x.nameKategory}>{x.nameKategory}</option>
//                     </>
//                 ))}
//             </select>בחר קטגוריה </h3>

//             <form id='t' action="./addApartment" onSubmit={(e) => send(e)}>
//                 {/* <div className="TextField-container">
//                     <i className="fa fa-user icon"></i>
//                     <TextField className="TextField-field" type="text" name="nameApartment" defaultValue={thisApartment1.nameApartment} required />
//                 </div> */}

               

//                 {/* <div className="TextField-container">
//                     <i className="fa fa-envelope icon"></i>
//                     <TextField className="TextField-field" name="describe" type="text" defaultValue={thisApartment1.describe} required />
//                 </div> */}

//                 <div className="TextField-container">
//                     <i className="fa fa-envelope icon"></i>
//                     <TextField className="TextField-field" name="adress" type="text" defaultValue={thisApartment1.adress} />
//                 </div>

//                 <div className="TextField-container">
//                     <i className="fa fa-envelope icon"></i>
//                     <TextField className="TextField-field" name="price" type="number" defaultValue={thisApartment1.price} />
//                 </div>

//                 <div className="TextField-container">
//                     <i className="fa fa-envelope icon"></i>
//                     <TextField className="TextField-field" name="extras" type="text" defaultValue={thisApartment1.extras} />
//                 </div>

               
//                 {/* הוספת שדות נוספים */}
//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="city" type="text" defaultValue={thisApartment1.city} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="neighbourhood" type="text" defaultValue={thisApartment1.neighbourhood} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="street" type="text" defaultValue={thisApartment1.street} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="numBuild" type="number" defaultValue={thisApartment1.numBuild} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="numRooms" type="number" defaultValue={thisApartment1.numRooms} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="squareMeter" type="number" defaultValue={thisApartment1.squareMeter} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="porch" type="text" defaultValue={thisApartment1.porch} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="porchSquareMeter" type="number" defaultValue={thisApartment1.porchSquareMeter} />
//                 </div>

//                 <div className="TextField-container">
//                     <TextField className="TextField-field" name="realEstateAgency" type="text" defaultValue={thisApartment1.realEstateAgency} />
//                 </div>

//                 <button type="submit" className="btn">שלח</button>
//             </form>
//         </>
//     )
// }
import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { getAllCities, getAllKategorys, updateApartment } from "./api";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export const UpdateApartment = () => {

    const [Kategory, setKategory] = useState();
    const [Kategory1, setKategory1] = useState();
    const [listKategories, setListK] = useState();
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const thisApartment = localStorage.getItem(`thisApartment`);
    const thisApartment1 = JSON.parse(thisApartment);
    console.log(thisApartment1.numBeds);
    const [price, setPrice] = useState(thisApartment1.price);

    useEffect(() => {
        getAllKategorys()
            .then(x => {
                console.log(x);
                setListK(x.data.kategorys);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const send = (event) => {
        event.preventDefault();

        // קביעת קטגוריה
        listKategories.map((x) => {
            if (x.nameKategory === Kategory) {
                setKategory1(x._id);
            }
        });

        const Apartment = {
            _id: thisApartment1._id,
            adress: event.target.adress?.value,
            price: event.target.price.value,
            extras: event.target.extras?.value,
            kodKategory: Kategory1,
            kodPublisher: localStorage.getItem(`user`),
            city: event.target.city.value,
            neighbourhood: event.target.neighbourhood.value,
            street: event.target.street.value,
            numBuild: event.target.numBuild.value,
            numRooms: event.target.numRooms.value,
            squareMeter: event.target.squareMeter.value,
            porch: event.target.porch.value,
            porchSquareMeter: event.target.porchSquareMeter.value,
            realEstateAgency: event.target.realEstateAgency.value,
            floor:event.target.floor.value,
            describe:event.target.describe.value,
        };

        console.log(Apartment);

        updateApartment(localStorage.getItem(`user`), Apartment)
            .then(x => {
                console.log(x.data);
                swal(`🤭🤭🤭 success`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const [inputText, setInputText] = useState('');

    const handleChange = (event) => {
      debugger
      const value = event.target.value;
  
      // מחלק את הטקסט למילים ומוודא שיש לא יותר מ-10 מילים
      const words = value.trim().split(/\s+/); // מפריד לפי רווחים או רווחים מרובים
      if (words.length <= 10) {
        setInputText(value);
      }}
      const handleChangePrice = (e) => {
        let value = e.target.value;
    
        // מסירים כל דמות לא מספרית
        value = value.replace(/[^0-9]/g, '');
    
        // מחלקים את המספר לשני חלקים - שלם ואחריו
        let parts = value.match(/(\d+)(\d{3})/);
    
        // אם ישנם יותר מ-3 ספרות, הוסף פסיקים
        while (parts) {
          value = value.replace(parts[0], parts[1] + ',' + parts[2]);
          parts = value.match(/(\d+)(\d{3})/);
        }
    
        // עדכון המצב עם הערך החדש
        setPrice(value);
      };
    return (
        <>
            {/* <Typography variant="h4" gutterBottom>
                עדכון פרטי הדירה
            </Typography> */}

            {/* <FormControl fullWidth margin="normal">
                <InputLabel>בחר קטגוריה</InputLabel>
                <Select
                    required
                    value={Kategory || ""}
                    onChange={(e) => setKategory(e.target.value)}
                    label="בחר קטגוריה"
                > */}
                    {/* {listKategories && listKategories.map((x) => (
                        <MenuItem key={x._id} value={x.nameKategory}>{x.nameKategory}</MenuItem>
                    ))} */}
                {/* </Select> */}
            {/* </FormControl> */}
            <div className="form-wrapper">
  <div className="form-b">
    <form id="t" onSubmit={send}>
      <h1>עדכון פרטי הדירה  </h1>

      {/* קטגוריה */}
      <div className="input-container full-width">
        <label>קטגוריה:</label>
        <select className="input-field select-field" defaultValue={thisApartment1.kodKategory.nameKategory} required onChange={(e) => setKategory(e.target.value)}>
          <option key="none" disabled selected>בחר קטגוריה</option>
          {listKategories && listKategories.map((category) => (
            <option key={category._id} value={category.nameKategory}>
              {category.nameKategory}
            </option>
          ))}
        </select>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
        <div className="input-container">
          <label>שכונה:</label>
          <input className="input-field" type="text" name="neighbourhood" defaultValue={thisApartment1.neighbourhood} required />
        </div>
        <div className="input-container">
          <label>קומה:</label>
          <input className="input-field" type="text" name="floor" defaultValue={thisApartment1.floor} required />
        </div>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
        <div className="input-container">
          <label>רחוב:</label>
          <input className="input-field" type="text" name="street" defaultValue={thisApartment1.street} required />
        </div>
        <div className="input-container">
          <label>מס' בניין:</label>
          <input className="input-field" type="text" name="numBuild" defaultValue={thisApartment1.numBuild} required />
        </div>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
        <div className="input-container">
          <label>מחיר:</label>
          <input className="input-field" type="text" name="price" 
        onChange={handleChangePrice}  value={price} required />
        </div>
        <div className="input-container">
          <label>שטח דירה (מ"ר):</label>
          <input className="input-field" type="text" name="squareMeter" defaultValue={thisApartment1.squareMeter} required />
        </div>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
        <div className="input-container">
          <label>מס' חדרים:</label>
          <input className="input-field" type="text" name="numRooms" defaultValue={thisApartment1.numRooms} required />
        </div>
        <div className="input-container">
          <label>מרפסת:</label>
          <input type="checkbox" name="porch" defaultChecked={thisApartment1.porch} />
        </div>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
        <div className="input-container">
          <label>שטח מרפסת (מ"ר):</label>
          <input className="input-field" type="text" name="porchSquareMeter" defaultValue={thisApartment1.porchSquareMeter} />
        </div>
        <div className="input-container">
          <label>תיווך:</label>
          <input type="checkbox" name="realEstateAgency" defaultChecked={thisApartment1.realEstateAgency} />
        </div>
      </div>

      {/* טור מלא */}
      <div className="input-container full-width">
        <label>עיר:</label>
        <input className="input-field" type="text" name="city" defaultValue={thisApartment1.city} required />
      </div>

      {/* טור מלא */}
      <div className="input-container full-width">
        <label>פרטים נוספים:</label>
        <input className="input-field" type="text" name="describe" value={inputText} onChange={handleChange}  />
        <p>נכנסו {inputText.trim().split(/\s+/).length} מילים</p>
      </div>

      <button type="submit" className="btn">שלח</button>
    </form>
  </div>
</div>

        </>
    );
};
