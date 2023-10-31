import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const getPlaceOrder = async () => {
    const data = await getDocs(collection(db, 'orders'));
    return data.docs.map((doc) => ({id: doc.id, ...doc.data() }))
}


const createOrder = async (formData) => {
    await addDoc(collection(db, "orders"), formData)
}

export {getPlaceOrder, createOrder}