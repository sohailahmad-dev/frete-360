import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';
// const API_BASE_URL = 'https://light-pantsuit-hen.cyclic.cloud/api/v1';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Function to make a POST request
async function postData(endPoint, data) {
    try {
        const response = await axiosInstance.post(endPoint, data);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle validation errors here
    }
}

// Function to make a GET request
async function getData(endPoint) {
    try {
        const response = await axiosInstance.get(endPoint);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle validation errors here
    }
}

// Function to make a PUT request
async function putData(endPoint, data) {
    try {
        const response = await axiosInstance.put(endPoint, data);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle validation errors here
    }
}

// Function to make a DELETE request
async function deleteData(endPoint) {
    try {
        const response = await axiosInstance.delete(endPoint);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle validation errors here
    }
}

export { postData, getData, putData, deleteData }

