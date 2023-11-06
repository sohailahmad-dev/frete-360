import React, { useRef, useState } from "react";
import "./FormHome.css";
import SelectBox from "../../../components/selectBox/SelectBox";
import { Box, FormControl, Grid } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import TextField from "@mui/material/TextField";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import successImg from "../../../assets/imgs/successImg.png";
import dayjs from "dayjs";
export default function FormHome() {
  const [dataObj, setDataObj] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const options = ["House", "Apartment", "Country House", "Studio Apartment"];
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
  const [displayOrderId, setDisplayOrderId] = useState();
  const [changeTime, setChangeTime] = useState(null);
  const imageInputRef = useRef();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ description: "", quantity: "" });

  // Error States
  // step 1
  const [originStateError, setOriginStateError] = useState("");
  const [originCityError, setOriginCityError] = useState("");
  const [houseTypeError, setHouseTypeError] = useState("");
  const [destinationStateError, setDestinationStateError] = useState("");
  const [destinationCityError, setDestinationCityError] = useState("");
  const [
    destinationHouseOrApartmentError,
    setDestinationHouseOrApartmentError,
  ] = useState("");
  const [selectDateError, setSelectDateError] = useState("");

  // step 2

  const [preferedTimeError, setPreferedTimeError] = useState("");
  const [restrictionOrFeesError, setRestrictionOrFeesError] = useState("");
  const [needMovingCompanyError, setNeedMovingCompanyError] = useState("");
  const [disassembleOrAssembleError, setDisassembleOrAssembleError] =
    useState("");
  const [isDateFlexibleError, setIsDateFlexibleError] = useState("");

  // step 3

  const [moreDetailInformationError, setMoreDetailInformationError] =
    useState("");
  const [newItemDescriptionError, setNewItemDescriptionError] = useState("");
  const [newItemQuantityError, setNewItemQuantityError] = useState("");

  // step 4

  const [step4Errors, setStep4Errors] = useState({});

  // validation functions

  // step 1

  const validateStep1 = () => {
    let isValid = true;

    if (!dataObj.originState) {
      setOriginStateError("Please select the origin state.");
      isValid = false;
    } else {
      setOriginStateError("");
    }

    if (!dataObj.originCity) {
      setOriginCityError("Please select the origin city.");
      isValid = false;
    } else {
      setOriginCityError("");
    }

    if (!selectedHouseType) {
      setHouseTypeError("Please select the house type.");
      isValid = false;
    } else {
      setHouseTypeError("");
    }

    if (!dataObj.destinationState) {
      setDestinationStateError("Please select the destination state.");
      isValid = false;
    } else {
      setDestinationStateError("");
    }

    if (!dataObj.destinationCity) {
      setDestinationCityError("Please select the destination city.");
      isValid = false;
    } else {
      setDestinationCityError("");
    }

    if (!selectedDestinationHouseOrApartment.selectedHouseType) {
      setDestinationHouseOrApartmentError(
        "Please select the destination house or apartment."
      );
      isValid = false;
    } else {
      setDestinationHouseOrApartmentError("");
    }

    if (!dataObj.dateOfChange) {
      setSelectDateError("Please select the Date.");
      isValid = false;
    } else {
      setSelectDateError("");
    }

    return isValid;
  };

  // step 2 validation function

  const validateStep2 = () => {
    let isValid = true;

    if (!dataObj.preferedTimeForMoving) {
      setPreferedTimeError("Please select a prefered time for moving.");
      isValid = false;
    } else {
      setPreferedTimeError("");
    }

    if (!dataObj.restrictionOrFees) {
      setRestrictionOrFeesError(
        "Please indicate if there are any restrictions or fees."
      );
      isValid = false;
    } else {
      setRestrictionOrFeesError("");
    }

    if (!dataObj.needMovingCompany) {
      setNeedMovingCompanyError(
        "Please indicate if you need a moving company to pack items."
      );
      isValid = false;
    } else {
      setNeedMovingCompanyError("");
    }

    if (!dataObj.disassembleOrAssemble) {
      setDisassembleOrAssembleError(
        "Please indicate if there is a need to disassemble or assemble furniture."
      );
      isValid = false;
    } else {
      setDisassembleOrAssembleError("");
    }

    if (!dataObj.isDateFlexible) {
      setIsDateFlexibleError("Please indicate if the date is flexible.");
      isValid = false;
    } else {
      setIsDateFlexibleError("");
    }

    return isValid;
  };

  // step 3 validation function

  const validateStep3 = () => {
    let isValid = true;
  
    if (!moreDetailInformation.trim()) {
      setMoreDetailInformationError("Please provide a detailed description.");
      isValid = false;
    } else {
      setMoreDetailInformationError("");
    }
  
  
    if (items.length === 0) {
      if (!newItem.description.trim()) {
        setNewItemDescriptionError("Description is required.");
        isValid = false;
      } else {
        setNewItemDescriptionError("");
      }
  
      if (!newItem.quantity.trim() || isNaN(newItem.quantity)) {
        setNewItemQuantityError("Quantity must be a number.");
        isValid = false;
      } else {
        setNewItemQuantityError("");
      }
    }
  
    return isValid;
  };
  

  

  // step 4 validation function

  const validateStep4 = (step4Data) => {
    const { name, email, phone } = step4Data;
    let isValid = true;
    const errors = {};

    // Validate name
    if (!name || name.trim() === "") {
      errors.name = "Name is required.";
      isValid = false;
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate phone
    if (!phone || !isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number.";
      isValid = false;
    }

    // You can add more specific validation rules here

    // Set error state if there are validation errors
    setStep4Errors(errors);

    return isValid;
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here, e.g., using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Implement your phone number validation logic here, e.g., using regex
    const phoneRegex = /^\d{10}$/; // Example: 1234567890 (10 digits)
    return phoneRegex.test(phone);
  };

  const addItem = () => {
    if (newItem.description.trim() !== "" && newItem.quantity.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem({ description: "", quantity: "" });
    }
  };

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

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date.$d);
  };

  const handleChangeTime = (time) => {
    setChangeTime(time.$d);
  };
  const isDateValid = (date) => {
    if (!date) return true; // No date selected is considered valid
    const today = dayjs();
    const maxDate = today.add(90, "day");
    return (
      date.isSame(today, "day") ||
      (date.isAfter(today) && date.isBefore(maxDate))
    );
  };
  const houseTypeOptions = [
    "House",
    "Apartment",
    "Country House",
    "Studio Apartment",
  ];
  const accessibilityOptions = ["Stairs", "Elevator", "Ramp"];
  const floorOptions = ["Ground Floor", "Specific Floor"];
  const [selectedHouseType, setSelectedHouseType] = useState("");
  const [selectedAccessibility, setSelectedAccessibility] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floorNumber, setFloorNumber] = useState("");

  const [
    selectedDestinationHouseOrApartment,
    setSelectedDestinationHouseOrApartment,
  ] = useState({
    selectedHouseType: "",
    selectedAccessibility: "",
    selectedFloor: "",
    floorNumber: "",
  });

  const handleDestinationHouseTypeChange = (value) => {
    setSelectedDestinationHouseOrApartment((prevState) => ({
      ...prevState,
      selectedHouseType: value,
      // Reset the other selections when the house type changes
      selectedAccessibility: "",
      selectedFloor: "",
      floorNumber: "",
    }));
  };

  const handleDestinationAccessibilityChange = (value) => {
    setSelectedDestinationHouseOrApartment((prevState) => ({
      ...prevState,
      selectedAccessibility: value,
    }));
  };

  const handleDestinationFloorChange = (value) => {
    setSelectedDestinationHouseOrApartment((prevState) => ({
      ...prevState,
      selectedFloor: value,
    }));
  };

  const handleDestinationFloorNumberChange = (value) => {
    setSelectedDestinationHouseOrApartment((prevState) => ({
      ...prevState,
      floorNumber: value,
    }));
  };

  const handleHouseTypeChange = (value) => {
    setSelectedHouseType(value);
    setSelectedAccessibility(""); // Clear selected accessibility
    setSelectedFloor(""); // Clear selected floor
    setFloorNumber(""); // Clear floor number
  };

  const handleAccessibilityChange = (value) => {
    setSelectedAccessibility(value);
    setSelectedFloor(""); // Clear selected floor
    setFloorNumber(""); // Clear floor number
  };

  const handleFloorChange = (value) => {
    setSelectedFloor(value);
    setFloorNumber(""); // Clear floor number
  };

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

  const addValue = (key, value) => {
    dataObj[key] = value.toString();
    setDataObj({ ...dataObj });
  };

  const moveToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const moveToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  const moveToStep4 = () => {
    if (validateStep3()) {
      setCurrentStep(4);
    }
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
    setItems([]); // Clear the items array
    setMoreDetailInformation("");
    setName("");
    setEmail("");
    setPhone("");
    setPreviewImage(""); // Clear the image preview
    setCities([]); // Clear the cities list
    setSelectedEstado(""); // Clear selected state
    setImageFile(null); // Clear image file
    setImageURL(null); // Clear image URL
    setDisplayOrderId(undefined); // Clear display order ID
    setChangeTime(null); // Clear change time
    setSelectedHouseType(""); // Clear selected house type
    setSelectedAccessibility(""); // Clear selected accessibility
    setSelectedFloor(""); // Clear selected floor
    setFloorNumber(""); // Clear floor number
    setSelectedDestinationHouseOrApartment({
      selectedHouseType: "",
      selectedAccessibility: "",
      selectedFloor: "",
      floorNumber: "",
    }); // Clear destination house/apartment options
  
    
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
    setDisplayOrderId(orderID);
    const step1Data = {
      originState: dataObj.originState ?? null,
      originCity: dataObj.originCity ?? null,
      originHouseOrApartment: {
        selectedHouseType: selectedHouseType ?? null,
        selectedAccessibility: selectedAccessibility ?? null,
        selectedFloor: selectedFloor ?? null,
        floorNumber: floorNumber ?? null,
      },
      destinationState: dataObj.destinationState ?? null,
      destinationCity: dataObj.destinationCity ?? null,
      destinationHouseOrApartment: selectedDestinationHouseOrApartment ?? null,
      dateOfChange: dataObj.dateOfChange ?? null,
    };

    const step2Data = {
      preferedTimeForMoving: dataObj.preferedTimeForMoving ?? null,
      changeTime: changeTime ?? null,
      restrictionOrFees: dataObj.restrictionOrFees ?? null,
      needMovingCompany: dataObj.needMovingCompany ?? null,
      disassembleOrAssemble: dataObj.disassembleOrAssemble ?? null,
      isDateFlexible: dataObj.isDateFlexible ?? null,
    };

    const step3Data = {
      items: items ?? null,
      moreDetailInformation: moreDetailInformation ?? null,
    };

    const step4Data = {
      name: name ?? null,
      email: email ?? null,
      phone: phone ?? null,
      imageURL: imageURL ?? null,
    };

    const formData = {
      step1Data,
      step2Data,
      step3Data,
      step4Data,
      orderID,
    };

    const isStep4Valid = validateStep4(step4Data);
    if (!isStep4Valid) {
      setLoading(false);
      setCurrentStep(4); // Navigate back to step 4
      return; // Prevent further submission
    }

    try {
      console.log(formData);
      await createOrder(formData);

      setLoading(false);
      setCurrentStep(5);
      // Handle any other actions or feedback (e.g., show a success message)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const removeItems = () => {
    setItems([]);
  };

  const backToForm = () => {
    setCurrentStep(1);
    resetState();
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

              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {originStateError}
              </div>
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Cidade"
                options={cities.map((city) => city.nome)} // Use the fetched cities here
                onChange={(val) => addValue("originCity", val)}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />

              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {originCityError}
              </div>
            </Grid>
            {/* multiselections */}

            <Grid item xs={12}>
              <SelectBox
                label="Select House Type"
                options={houseTypeOptions}
                onChange={handleHouseTypeChange}
                value={selectedHouseType}
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {houseTypeError}
              </div>
            </Grid>

            {/* Render SelectBox for Accessibility */}
            {selectedHouseType && (
              <Grid item xs={12}>
                <SelectBox
                  label="Select Accessibility"
                  options={accessibilityOptions}
                  onChange={handleAccessibilityChange}
                  value={selectedAccessibility}
                />
              </Grid>
            )}

            {/* Render SelectBox for Floor */}
            {selectedAccessibility === "Stairs" && (
              <Grid item xs={12}>
                <SelectBox
                  label="Select Floor"
                  options={floorOptions}
                  onChange={handleFloorChange}
                  value={selectedFloor}
                />
              </Grid>
            )}

            {/* Render InputField for Floor Number */}
            {selectedFloor === "Specific Floor" && (
              <Grid item xs={12}>
                <InputField
                  label="Enter Floor Number"
                  placeholder="Enter the Floor Number"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                />
              </Grid>
            )}

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
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {destinationStateError}
              </div>
            </Grid>
            <Grid item xs={6}>
              <SelectBox
                label="Cidade"
                options={cities.map((city) => city.nome)} // Use the fetched cities here
                onChange={(val) => addValue("destinationCity", val)}
                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              />

              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {destinationCityError}
              </div>
            </Grid>
            <Grid item xs={12}>
              <SelectBox
                label="Casa ou Apartamento"
                options={options}
                onChange={handleDestinationHouseTypeChange}
                value={selectedDestinationHouseOrApartment.selectedHouseType}
              />

              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {destinationHouseOrApartmentError}
              </div>
            </Grid>

            {/* Render SelectBox for Accessibility */}
            {(selectedDestinationHouseOrApartment.selectedHouseType ===
              "House" ||
              selectedDestinationHouseOrApartment.selectedHouseType ===
                "Apartment" ||
              selectedDestinationHouseOrApartment.selectedHouseType ===
                "Country House" ||
              selectedDestinationHouseOrApartment.selectedHouseType ===
                "Studio Apartment") && (
              <Grid item xs={12}>
                <SelectBox
                  label="Select Accessibility"
                  options={accessibilityOptions}
                  onChange={handleDestinationAccessibilityChange}
                  value={
                    selectedDestinationHouseOrApartment.selectedAccessibility
                  }
                />
              </Grid>
            )}

            {/* Render SelectBox for Floor */}
            {selectedDestinationHouseOrApartment.selectedAccessibility ===
              "Stairs" && (
              <Grid item xs={12}>
                <SelectBox
                  label="Select Floor"
                  options={floorOptions}
                  onChange={handleDestinationFloorChange}
                  value={selectedDestinationHouseOrApartment.selectedFloor}
                />
              </Grid>
            )}

            {/* Render InputField for Floor Number */}
            {selectedDestinationHouseOrApartment.selectedFloor ===
              "Specific Floor" && (
              <Grid item xs={12}>
                <InputField
                  label="Enter Floor Number"
                  placeholder="Enter the Floor Number"
                  value={selectedDestinationHouseOrApartment.floorNumber}
                  onChange={(e) =>
                    handleDestinationFloorNumberChange(e.target.value)
                  }
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <div className="form-heading">Qual a data da mudança?</div>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="dd/mm/yyyy"
                  value={selectedDate}
                  onChange={(val) => {
                    addValue("dateOfChange", val.$d);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  shouldDisableDate={(date) => !isDateValid(dayjs(date))}
                  error={!isDateValid(dayjs(selectedDate))}
                  helperText={
                    !isDateValid(dayjs(selectedDate))
                      ? "Date cannot be more than 90 days from the request date"
                      : ""
                  }
                  sx={{
                    width: "100%",
                    background: "white",
                  }}
                />
              </LocalizationProvider>
              {selectDateError.length === 0 ? (
                <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                Atenção: a data máxima da mudança é de até 90 dias a partir do
                dia de hoje.
              </div>
              ) : (
                <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginTop: "5px",
                }}
              >
                {selectDateError}
              </div>
              )}
              
            </Grid>
            <Grid item xs={12}>
              <div>
                <Btn
                  label="Próximo"
                  onClick={moveToStep2}
                  style={{ width: "100%", height: "45px", margin: "5px 0px" }}
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
                timeValue={changeTime}
                channgeTimeHandle={handleChangeTime}
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {preferedTimeError}
              </div>
              <CheckBox
                defaultValue={dataObj?.restrictionOrFees}
                onChange={(val) => addValue("restrictionOrFees", val)}
                label="Há alguma restrição ou taxa para transitar ou estacionar em frente a um dos endereços?"
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {restrictionOrFeesError}
              </div>
              <CheckBox
                defaultValue={dataObj?.needMovingCompany}
                onChange={(val) => addValue("needMovingCompany", val)}
                label="Você precisa que a empresa de mudanças embale algum item para você?"
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {needMovingCompanyError}
              </div>
              <CheckBox
                defaultValue={dataObj?.disassembleOrAssemble}
                onChange={(val) => addValue("disassembleOrAssemble", val)}
                label="Existe necessidade de desmontagem e montagem de móveis?"
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {disassembleOrAssembleError}
              </div>
              <CheckBox
                defaultValue={dataObj?.isDateFlexible}
                onChange={(val) => addValue("isDateFlexible", val)}
                label="A data é flexível?"
              />
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginBottom: "15px",
                }}
              >
                {isDateFlexibleError}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "20px", marginTop: "-20px" }}>
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
              <div
                style={{
                  width: "100%",
                  color: "#FF5F5F",
                  fontSize: 14,
                  fontStyle: "italic",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  marginBottom: "15px",
                }}
              >
                {moreDetailInformationError}
              </div>
              <div className="form-heading1">If you prefer, add items</div>

              <div className="form-add-field">
                <InputField
                  placeholder="Description"
                  style={{ flex: 7 }}
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />

                <InputField
                  placeholder="Quantity"
                  style={{ flex: 4 }}
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />

                <Btn
                  label="+"
                  onClick={addItem}
                  style={{
                    height: "40px",
                    background: "#00A907",
                    padding: "0px 20px",
                    fontSize:"30px"
                  }}
                />
              </div>
              <div style={{ display: "flex", marginLeft: "15px" }}>
                <div
                  style={{
                    width: "100%",
                    color: "#FF5F5F",
                    fontSize: 14,
                    fontStyle: "italic",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {newItemDescriptionError}
                </div>
                <div
                  style={{
                    width: "100%",
                    color: "#FF5F5F",
                    fontSize: 14,
                    fontStyle: "italic",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {newItemQuantityError}
                </div>
              </div>

              <div>
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <div style={{ flex: 1 }}>{item.description}</div>
                    <div
                      style={{ flex: 1, textAlign: "left", marginLeft: "50px" }}
                    >
                      {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              {items.length === 0 ? null : (
                <div
                  onClick={removeItems}
                  style={{
                    textAlign: "right",
                    cursor: "pointer",
                    color: "#EA4646",
                    fontSize: 16,
                    fontStyle: "italic",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    wordWrap: "break-word",
                    marginTop: "10px",
                  }}
                >
                  Limpar lista
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "0px" }}
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
              <div className="form-heading">
                Informe seus dados para contato:
              </div>
              <InputField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name:"
              />
              {step4Errors.name && <div
                  style={{
                    width: "100%",
                    color: "#FF5F5F",
                    fontSize: 14,
                    fontStyle: "italic",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {step4Errors.name}
                </div> }
              <InputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email:"
              />
              {step4Errors.email && <div
                  style={{
                    width: "100%",
                    color: "#FF5F5F",
                    fontSize: 14,
                    fontStyle: "italic",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {step4Errors.email}
                </div> }
              <InputField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone:"
              />
                {step4Errors.phone && <div
                  style={{
                    width: "100%",
                    color: "#FF5F5F",
                    fontSize: 14,
                    fontStyle: "italic",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {step4Errors.phone}
                </div> }
              <div
                className="upload-photo-box"
                onClick={() => imageInputRef.current.click()}
              >
                <img
                  src={imageURL || photo} // Use the previewImage state for the image source
                  alt="photo"
                  className="upload-photo"
                />
                <div className="upload-photo-innerBox">
                  <div
                    className="upload-photo-text"
                    style={{ marginBottom: "5px" }}
                  >
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
                style={{ display: "flex", gap: "20px", marginBottom: "0px" }}
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
        {/* Step 5  */}
        {currentStep === 5 && (
          <Grid container spacing={2}>
            {/* Step 5 content */}
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <div className="form-success-heading">
                  Pedido realizado <br /> com sucesso!
                </div>
                <div className="form-success-content">
                  O número do seu pedido é<div>{displayOrderId}</div>
                </div>
                <img
                  className="form-success-img"
                  src={successImg}
                  alt="success-img"
                />
                <Btn
                  label="Voltar ao inicio"
                  onClick={backToForm}
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
