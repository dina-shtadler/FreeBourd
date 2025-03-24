
import { Box, ButtonBase, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { getAllCities, getAllKategorys, updateApartment } from "./api";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { FaSpinner } from 'react-icons/fa'; // דוגמה לשימוש באייקון של ספינר

export const UpdateApartment = () => {

    const [Kategory, setKategory] = useState();
    const [Kategory1, setKategory1] = useState();
    const [listKategories, setListK] = useState();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false); // מצב הטעינה

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
        setLoading(true); // מכניסים את הכפתור למצב טעינה

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
            email:event.target.email.value,
            phone:event.target.phone.value,
            secondPhone:event.target.secondPhone.value,
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
        <label>טלפון נוסף לפירסום:</label>
        <input className="input-field" type="text" name="secondPhone" defaultValue={thisApartment1.secondPhone}  />
      </div>
        <div className="input-container">
          <label>טלפון לפירסום:</label>
          <input className="input-field" type="text" name="phone" defaultValue={thisApartment1.phone}  />
        </div>
         <div className="input-container">
          <label>כתובת מייל לפירסום:</label>
          <input className="input-field" type="email" name="email" defaultValue={thisApartment1.email}  />
        </div>
       
      </div>   <div className="row">
      <div className="input-container">
        <label>עיר:</label>
        <input className="input-field" type="text" name="city" defaultValue={thisApartment1.city} required />
      </div>
        <div className="input-container">
          <label>שכונה:</label>
          <input className="input-field" type="text" name="neighbourhood" defaultValue={thisApartment1.neighbourhood} required />
        </div>
         <div className="input-container">
          <label>רחוב:</label>
          <input className="input-field" type="text" name="street" defaultValue={thisApartment1.street} required />
        </div>
       
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
         <div className="input-container">
          <label>קומה:</label>
          <input className="input-field" type="text" name="floor" defaultValue={thisApartment1.floor}  />
        </div>
       
        <div className="input-container">
          <label>מס' בניין:</label>
          <input className="input-field" type="text" name="numBuild" defaultValue={thisApartment1.numBuild}  />
        </div>
        <div className="input-container">
          <label>מס' חדרים:</label>
          <input className="input-field" type="text" name="numRooms" defaultValue={thisApartment1.numRooms} required />
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
          <label>שטח מרפסת (מ"ר):</label>
          <input className="input-field" type="text" name="porchSquareMeter" defaultValue={thisApartment1.porchSquareMeter} />
        </div>
        <div className="input-container">
          <label>מרפסת:</label>
          <input type="checkbox" name="porch" defaultChecked={thisApartment1.porch === true || thisApartment1.porch === "true"} />
        </div>
         
        <div className="input-container">
          <label>תיווך:</label>
          <input type="checkbox" name="realEstateAgency" defaultChecked={thisApartment1.realEstateAgency === true || thisApartment1.realEstateAgency === "true"} />
        </div>
      </div>

      {/* מבנה של שני טורים */}
      <div className="row">
       
      

      
      <button type="submit" className="input-container btEn" disabled={loading}>   {loading ? <FaSpinner className="spinner" /> : 'שלח '}
      </button>
      {/* טור מלא */}
      <div className="input-container">
        <label>פרטים נוספים:</label>
        <input className="input-field" type="text" name="describe" defaultValue={thisApartment1.describe} onChange={handleChange}  />
        <p>נכנסו {inputText.trim().split(/\s+/).length} מילים</p>
      </div>

   </div> </form>
  </div>
</div>

        </>
    );
};
