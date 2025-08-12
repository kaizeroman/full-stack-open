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

const deleteContact = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request
}

export default {
    getAllContacts,
    addContact,
    deleteContact
}