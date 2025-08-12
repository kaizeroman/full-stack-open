import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addContact = (newContact) => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

export default {
    getAllContacts,
    addContact
}