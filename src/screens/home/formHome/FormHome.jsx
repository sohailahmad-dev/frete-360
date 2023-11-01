import React, { useRef, useState } from "react";
import "./FormHome.css";
import SelectBox from "../../../components/selectBox/SelectBox";
import { Box, FormControl, Grid } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Btn from "../../../components/btn/Btn";
import CheckBox from "../../../components/checkBox/CheckBox";
import InputField from "../../../components/inputField/InputField";
import photo from "../../../assets/imgs/photo.png";
import tick from "../../../assets/imgs/tick.png";
import { createOrder } from "../../../firebaseService";
import { collection, getDocs, where, query } from "firebase/firestore"; // Import query and where
import { db, storage } from "../../../firebase";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function FormHome() {
  const [dataObj, setDataObj] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const options = ["House", "Apartment", "Country House", "Studio Apartment"];
  const [items, setItems] = useState([{ description: "", quantity: "" }]);
  const [moreDetailInformation, setMoreDetailInformation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState("");
  const [imageFile, setImageFile] = useState(null);
const [imageURL, setImageURL] = useState(null);

  const imageInputRef = useRef();
  const estadoOptions = [
    { name: "Acre", code: "AC" },
    { name: "Alagoas", code: "AL" },
    { name: "Amapá", code: "AP" },
    { name: "Amazonas", code: "AM" },
    { name: "Bahia", code: "BA" },
    { name: "Ceará", code: "CE" },
    { name: "Distrito Federal", code: "DF" },
    { name: "Espírito Santo", code: "ES" },
    { name: "Goiás", code: "GO" },
    { name: "Maranhão", code: "MA" },
    { name: "Mato Grosso", code: "MT" },
    { name: "Mato Grosso do Sul", code: "MS" },
    { name: "Minas Gerais", code: "MG" },
    { name: "Pará", code: "PA" },
    { name: "Paraíba", code: "PB" },
    { name: "Paraná", code: "PR" },
    { name: "Pernambuco", code: "PE" },
    { name: "Piauí", code: "PI" },
    { name: "Rio de Janeiro", code: "RJ" },
    { name: "Rio Grande do Norte", code: "RN" },
    { name: "Rio Grande do Sul", code: "RS" },
    { name: "Rondônia", code: "RO" },
    { name: "Roraima", code: "RR" },
    { name: "Santa Catarina", code: "SC" },
    { name: "São Paulo", code: "SP" },
    { name: "Sergipe", code: "SE" },
    { name: "Tocantins", code: "TO" },
  ];

  // Function to fetch cities based on the selected state
  const fetchCitiesByEstado = async (estado) => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      );
      const cities = response.data;
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]); // Clear the cities list in case of an error
    }
  };

  const fetchCities = (estado) => {
    setSelectedEstado(estado);
    if (estado) {
      fetchCitiesByEstado(estado);
    } else {
      setCities([]); // Clear the cities list if no state is selected
    }
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: "" }]);
  };

  const addValue = (key, value) => {
    dataObj[key] = value.toString();
    setDataObj({ ...dataObj });
  };



  const moveToStep2 = () => {
    setCurrentStep(2);
  };

  const moveToStep3 = () => {
    setCurrentStep(3);
  };

  const moveToStep4 = () => {
    setCurrentStep(4);
  };

  const moveBackStep1 = () => {
    setCurrentStep(1);
  };

  const moveBackStep2 = () => {
    setCurrentStep(2);
  };

  const moveBackStep3 = () => {
    setCurrentStep(3);
  };

  const handleImageSelect = () => {
    const fileInput = imageInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedImage = fileInput.files[0];
  
      // Upload the selected image to Firebase Storage
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImageFile(selectedImage);
          setImageURL(downloadURL);
        });
      });
    }
  };
  

  

  const resetState = () => {
    setDataObj({});
    setCurrentStep(1);
    setItems([{ description: "", quantity: "" }]);
    setMoreDetailInformation("");
    setName("");
    setEmail("");
    setPhone("");
  };



  

  const submitData = async () => {
    setLoading(true);

    const generateRandomID = () => {
      // Generate a random 8-digit ID
      const min = 1000000;
      const max = 9999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const isIDUnique = async (id) => {
      // Check if the generated ID exists in the "orders" collection
      const orderCollection = collection(db, "orders");
      const q = query(orderCollection, where("orderID", "==", id)); // Use "query" here
      const querySnapshot = await getDocs(q); // Use "q" here
      return querySnapshot.empty; // Returns true if the ID is unique
    };

    const generateUniqueID = async () => {
      let id;
      do {
        id = generateRandomID();
      } while (!(await isIDUnique(id)));
      return id;
    };

    // Generate a unique random 8-digit ID
    const orderID = await generateUniqueID();

    const step1Data = {
      originState: dataObj.originState,
      originCity: dataObj.originCity,
      originHouseOrApartment: dataObj.originHouseOrApartment,
      destinationState: dataObj.destinationState,
      destinationCity: dataObj.destinationCity,
      destinationHouseOrApartment: dataObj.destinationHouseOrApartment,
      dateOfChange: dataObj.dateOfChange,
    };

    const step2Data = {
      preferedTimeForMoving: dataObj.preferedTimeForMoving,
      restrictionOrFees: dataObj.restrictionOrFees,
      needMovingCompany: dataObj.needMovingCompany,
      disassembleOrAssemble: dataObj.disassembleOrAssemble,
      isDateFlexible: dataObj.isDateFlexible,
    };

    const step3Data = {
      items,
      moreDetailInformation,
    };

    const step4Data = {
      name,
      email,
      phone,
      imageURL: imageURL, // Add the imageURL from state
    };

    const formData = {
      step1Data,
      step2Data,
      step3Data,
      step4Data,
      orderID,
    };

    try {
      
      
      await createOrder(formData);
    
      setLoading(false);
      resetState();
      // Handle any other actions or feedback (e.g., show a success message)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="home-form-parent">
      <div className="home-form-navigator">
        <div className="home-form-navigator-line" />
        <div className="home-form-circles">
          <div
            className={
              currentStep === 1 ? "current-circle" : "home-form-circle"
            }
          >
            {currentStep > 1 ? <img src={tick} alt="tick" /> : "1"}
          </div>
          <div
            className={
              currentStep === 2 ? "current-circle" : "home-form-circle"
            }
          >
            {currentStep > 2 ? <img src={tick} alt="tick" /> : "2"}
          </div>
          <div
            className={
              currentStep === 3 ? "current-circle" : "home-form-circle"
            }
          >
            {currentStep > 3 ? <img src={tick} alt="tick" /> : "3"}
          </div>
          <div
            className={
              currentStep === 4 ? "current-circle" : "home-form-circle"
            }
          >
            {currentStep > 4 ? <img src={tick} alt="tick" /> : "4"}
          </div>
        </div>
      </div>
      <div className="home-form">
        {/* Step 1 */}
        {currentStep === 1 && (
          <Grid container spacing={2}>
            {/* Step 1 content */}
            <Grid item xs={12}>
              <div className="form-heading">Qual origem da mudança?</div>
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Estado"
                options={estadoOptions.map((state) => state.name)} // Display state names
                onChange={(val) => {
                  const selectedState = estadoOptions.find(
                    (state) => state.name === val
                  );
                  if (selectedState) {
                    addValue("originState", selectedState.code); // Set state code as value
                    fetchCities(selectedState.code); // Fetch cities based on the selected state code
                  }
                }}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Cidade"
                options={cities.map((city) => city.nome)} // Use the fetched cities here
                onChange={(val) => addValue("originCity", val)}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectBox
                label="Casa ou Apartamento"
                options={options}
                onChange={(val) => addValue("originHouseOrApartment", val)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="form-heading">Qual destino da mudança?</div>
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Estado"
                options={estadoOptions.map((state) => state.name)} // Display state names
                onChange={(val) => {
                  const selectedState = estadoOptions.find(
                    (state) => state.name === val
                  );
                  if (selectedState) {
                    addValue("destinationState", selectedState.code); // Set state code as value
                    fetchCities(selectedState.code); // Fetch cities based on the selected state code
                  }
                }}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Cidade"
                options={cities.map((city) => city.nome)} // Use the fetched cities here
                onChange={(val) => addValue("destinationCity", val)}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectBox
                label="Casa ou Apartamento"
                options={options}
                onChange={(val) => addValue("destinationHouseOrApartment", val)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="form-heading">Qual a data da mudança?</div>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="dd/mm/aa"
                    onChange={(val) => {
                        addValue("dateOfChange", val.$d);
                    }}
                    sx={{
                      width: "100%",
                      background: "white",
                      border: "1px solid gray",
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Btn
                  label="Próximo"
                  onClick={moveToStep2}
                  style={{ width: "100%", height: "45px", margin: "15px 0px" }}
                />
              </div>
            </Grid>
          </Grid>
        )}
        {/* Step 2 */}
        {currentStep === 2 && (
          <Grid container spacing={2}>
            {/* Step 2 content */}
            <Grid item xs={12}>
              <div className="form-heading">Informações adicionais:</div>
              <CheckBox
                defaultValue={dataObj?.preferedTimeForMoving}
                onChange={(val) => addValue("preferedTimeForMoving", val)}
                label="Existe algum horário preferencial para a mudança?"
                showQual={true}
              />
              <CheckBox
                defaultValue={dataObj?.restrictionOrFees}
                onChange={(val) => addValue("restrictionOrFees", val)}
                label="Há alguma restrição ou taxa para transitar ou estacionar em frente a um dos endereços?"
              />
              <CheckBox
                defaultValue={dataObj?.needMovingCompany}
                onChange={(val) => addValue("needMovingCompany", val)}
                label="Você precisa que a empresa de mudanças embale algum item para você?"
              />
              <CheckBox
                defaultValue={dataObj?.disassembleOrAssemble}
                onChange={(val) => addValue("disassembleOrAssemble", val)}
                label="Existe necessidade de desmontagem e montagem de móveis?"
              />
              <CheckBox
                defaultValue={dataObj?.isDateFlexible}
                onChange={(val) => addValue("isDateFlexible", val)}
                label="A data é flexível?"
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "15px" }}
              >
                <Btn
                  label="Voltar"
                  onClick={moveBackStep1}
                  style={{
                    width: "100%",
                    height: "45px",
                    background: "white",
                    border: "2px solid #0026AB",
                    color: "#0026AB",
                  }}
                />
                <Btn
                  label="Próximo"
                  onClick={moveToStep3}
                  style={{ width: "100%", height: "45px" }}
                />
              </div>
            </Grid>
          </Grid>
        )}
        {/* Step 3 */}
        {currentStep === 3 && (
          <Grid container spacing={2}>
            {/* Step 3 content */}
            <Grid item xs={12}>
              <div className="form-heading">
                Use the space to describe in detail the items for your move
              </div>
              <textarea
                value={moreDetailInformation}
                onChange={(e) => setMoreDetailInformation(e.target.value)}
                className="textArea-form"
                placeholder="The more detailed the description, the more accurately companies can provide a suitable quote."
              />
              <div className="form-heading1">If you prefer, add items</div>
              {items.map((item, index) => (
                <div key={index} className="form-add-field">
                  <InputField
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].description = e.target.value;
                      setItems(newItems);
                    }}
                  />
                  <InputField
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity = e.target.value;
                      setItems(newItems);
                    }}
                  />
                  {index === items.length - 1 && (
                    <Btn
                      label="+"
                      onClick={addItem}
                      style={{
                        height: "40px",
                        background: "#00A907",
                        padding: "0px 20px",
                      }}
                    />
                  )}
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "15px" }}
              >
                <Btn
                  label="Voltar"
                  onClick={moveBackStep2}
                  style={{
                    width: "100%",
                    height: "45px",
                    background: "white",
                    border: "2px solid #0026AB",
                    color: "#0026AB",
                  }}
                />
                <Btn
                  label="Próximo"
                  onClick={moveToStep4}
                  style={{ width: "100%", height: "45px" }}
                />
              </div>
            </Grid>
          </Grid>
        )}
        {/* Step 4 */}
        {currentStep === 4 && (
          <Grid container spacing={2}>
            {/* Step 4 content */}
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <div className="form-heading">
                  Provide your contact information:
                </div>
              </div>
              <InputField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name:"
              />
              <InputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email:"
              />
              <InputField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone:"
              />
              <div className="upload-photo-box">
              <img
                  src={imageURL || photo} // Use the previewImage state for the image source
                  alt="photo"
                  className="upload-photo"
                  onClick={() => imageInputRef.current.click()}
                />
                <div className="upload-photo-innerBox">
                  <div className="upload-photo-text">
                    Add a photo of your face
                  </div>
                  <div className="upload-photo-text1">
                    The photo will only be used for validation purposes
                  </div>
                </div>
                {/* Input for image selection */}
                <input
                  type="file"
                  accept="/image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                  ref={imageInputRef}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "15px" }}
              >
                <Btn
                  label="Voltar"
                  onClick={moveBackStep3}
                  style={{
                    width: "100%",
                    height: "45px",
                    background: "white",
                    border: "2px solid #0026AB",
                    color: "#0026AB",
                  }}
                />
                <Btn
                  label={loading ? "loading..." : "Finalizar"}
                  onClick={submitData}
                  style={{ width: "100%", height: "45px" }}
                />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}
