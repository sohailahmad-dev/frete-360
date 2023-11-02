import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const getPlaceOrder = async () => {
    const data = await getDocs(collection(db, 'orders'));
    return data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

const createOrder = async (formData) => {
    await addDoc(collection(db, "orders"), formData);
}

const getOrderById = async (orderId) => {
    const orderDocRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderDocRef);
    if (orderDoc.exists()) {
        return { id: orderDoc.id, ...orderDoc.data() };
    } else {
        throw new Error("Order not found");
    }
}

export { getPlaceOrder, createOrder, getOrderById };
