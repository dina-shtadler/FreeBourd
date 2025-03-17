import axios from "axios";
// import { $CombinedState } from "redux";

export const getAllByKodKategory = (kodKategory) => {
  console.log(kodKategory)
  return axios.get(`http://localhost:3001/getAllByKodKategory/${kodKategory}`);
};
export const getAllByKodCity = (kodCity,) => {
  return axios.get(`http://localhost:3001/getAllByKodCity/${kodCity}`);
};
export const getAllByKodpublisher = (kodPublisher,) => {
  const token = localStorage.getItem(`token`)

  return axios.get(`http://localhost:3001/getAllByKodpublisher/${kodPublisher}`, { headers: { 'Authorization': token } });
};
export const getAllByPriceToNight = (smallerthan, biggerthan,) => {
  return axios.get(`http://localhost:3001/getAllByPriceToNight/${smallerthan}/${biggerthan}`);
};
export const getAllByNumBeds = (NumBeds,) => {
  return axios.get(`http://localhost:3001/getAllByNumBeds/${NumBeds}`);
};
export const getAllApartment = () => {
  return axios.get(`https://advertismentfree.onrender.com/getAll`);
};

export const getById = (id) => {
  return axios.get(`https://advertismentfree.onrender.com/getById/${id}`);
};
export const createApartment = (kodPublisher, newApartment) => {
  const token = localStorage.getItem(`token`)
  return axios.post(`http://localhost:3001/createApartment/${kodPublisher}`, newApartment, { headers: { authorization: `${token}` } })
};
export const updateApartment = (kodPublisher, Apartment) => {
  const token = localStorage.getItem(`token`)

  return axios.put(`https://advertismentfree.onrender.com/updateApartment/${kodPublisher}`, Apartment, { headers: { authorization: `${token}` }})
};
export const removeApartment = (id, kodPublisher, Apartment) => {
  const token = localStorage.getItem(`token`)
  console.log(token)
  return axios.delete(`https://advertismentfree.onrender.com/removeApartment/${id}/${kodPublisher}`, { headers: { authorization: `${token}` } });
};
export const registerP = (publisher) => {
  debugger
  return axios.post(`https://advertismentfree.onrender.com/registerP`, publisher);
};
export const loginp = (email, password) => {
  return axios.get(`https://advertismentfree.onrender.com/loginp/${email}/${password}`);
};
export const registerc = (newClient) => {
  return axios.post(`http://localhost:3001/registerc`, newClient);
};
export const loginc = (email, password) => {
  return axios.get(`http://localhost:3001/loginc/${email}/${password}`);
};

//City 
export const AddCity = (kodPublisher, newCity) => {
  const token = localStorage.getItem(`token`)

  return axios.post(`http://localhost:3001/AddCity/${kodPublisher}`, newCity,  { headers: { authorization: `${token}` } });
};
export const getAllCities = () => {
  return axios.get(`http://localhost:3001/getAllCities`);
};
export const getWeather = (idCity) => {
  return axios.get(`http://localhost:3001/getWeather/${idCity}`);
};

//Kategory
export const Addkategory = (kodPublisher, newKategory) => {
  const token = localStorage.getItem(`token`)

  return axios.post(`http://localhost:3001/Addkategory/${kodPublisher}`, newKategory, { headers: { 'Authorization': token } });
};
export const getAllKategorys = () => {
  return axios.get(`https://advertismentfree.onrender.com/getAllKategorys`);
};
/*
router.get('/getByIdAndnumDays/:id/:numDays',apartmentController.getById) 
*/ 