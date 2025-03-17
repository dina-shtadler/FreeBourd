
import { createApartment, getAllKategorys, AddCity } from "./api";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import './addapartment.css'

export const AddApartments = () => {
  const [price, setPrice] = useState('');

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
      const formElements = event.target.elements;

      formData.append("neighbourhood", formElements.neighbourhood.value);
      formData.append("floor", Number(formElements.floor.value) || 0);
      formData.append("street", formElements.street.value);
      formData.append("numBuild", Number(formElements.numBuild.value) || 0);
      formData.append("price",price || "");
      formData.append("squareMeter", Number(formElements.squareMeter.value) || 0);
      formData.append("numRooms", Number(formElements.numRooms.value) || 0);
      formData.append("porch", formElements.porch.checked);
      formData.append("porchSquareMeter", Number(formElements.porchSquareMeter.value) || 0);
      formData.append("realEstateAgency", formElements.realEstateAgency.checked ? "true" : "false");
      formData.append("city", formElements.city.value);
      formData.append("secondPhone", formElements.secondPhone.value);
      formData.append("phone", formElements.phone.value);
      formData.append("email", formElements.email.value);
      formData.append("datend", formElements.datend.value);
      formData.append("describe", formElements.describe.value);
      formData.append("kodPublisher", localStorage.getItem("user"));

      // חיפוש קטגוריה נבחרת
      const selectedCategory = listKategories.find((x) => x.nameKategory === Kategory);
      if (selectedCategory) {
          formData.append("kodKategory", selectedCategory._id);
      }
      createApartment(localStorage.getItem("user"), formData)
          .then(() => {
              swal("🤭🤭🤭 success");
          })
          .catch((err) => {
              console.error(err);
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
   <div className="form-wrapper"><div className="from-b">
    <form id="t" onSubmit={send}>
        <h1>הוספת דירה למאגר</h1>

        <div className="input-container full-width">
            <label>קטגוריה:</label>
            <select className="input-field select-field" required onChange={(e) => setKategory(e.target.value)}>
                <option key="none" disabled selected>בחר קטגוריה</option>
                {listKategories &&
                    listKategories.map((category) => (
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
           <input className="input-field" type="number" name="secondPhone" />
       </div>
        <div className="input-container">
           <label>טלפון לפירסום:</label>
           <input className="input-field" type="number" name="phone" />
       </div>
        <div className="input-container">
       <label>אמייל לפירסום:</label>
       <input className="input-field" type="email" name="email"  />
   </div>

   </div>
        {/* מבנה של שני טורים */}
        <div className="row">
       
           
            <div className="input-container">
                <label>רחוב:</label>
                <input className="input-field" type="text" name="street" required />
            </div>
             <div className="input-container">
                <label>שכונה:</label>
                <input className="input-field" type="text" name="neighbourhood" required />
            </div>
             <div className="input-container">
            <label>עיר:</label>
            <input className="input-field" type="text" name="city" required />
        </div>

        </div>

        <div className="row">
        <div className="input-container">
                <label>קומה:</label>
                <input className="input-field" type="text" name="floor"  />
            </div>
           
            <div className="input-container">
                <label>מס' בניין:</label>
                <input className="input-field" type="text" name="numBuild"  />
            </div>
        </div>

        <div className="row">
            <div className="input-container">
                <label>מחיר:</label>
                <input className="input-field"     
        value={price}
        onChange={handleChangePrice} type="text" name="price" required />
            </div>
            <div className="input-container">
                <label>שטח דירה (מ"ר):</label>
                <input className="input-field" type="text" name="squareMeter" required />
            </div>
             <div className="input-container">
                <label>מס' חדרים:</label>
                <input className="input-field" type="text" name="numRooms" required />
            </div>
        </div>

        <div className="row">
           <div className="input-container">
                <label>תיווך:</label>
                <input type="checkbox" name="realEstateAgency" />
            </div>
            <div className="input-container">
                <label>מרפסת:</label>
                <input type="checkbox" name="porch" />
            </div> 
             <div className="input-container">
                <label>שטח מרפסת (מ"ר):</label>
                <input className="input-field" type="text" name="porchSquareMeter" />
            </div>
            
        </div>

        <div className="row">
          
            
       
        <button type="submit" className="input-container btEn">שלח</button>

     
       

        <div className="input-container full-width">
            <label>פרטים נוספים:</label>
            <input className="input-field" type="text" name="describe" value={inputText} onChange={handleChange}  />
            <p>נכנסו {inputText.trim().split(/\s+/).length} מילים</p>
        </div>
         <div className="input-container date">
            <label>פרסום עד:</label>
            <input type="date" name="datend" required min={currentDate} max={maxDateString} />
        </div>
 </div>
    </form></div>
</div>
      </>
  );
};
