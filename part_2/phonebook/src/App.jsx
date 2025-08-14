import Search from './components/Search'
import Form from './components/Form'
import People from './components/People'
import { useState, useEffect } from 'react'
import pbservice from './services/Phonebook'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => { 
    pbservice.getAllContacts().then(data => setPersons(data) )
   }, [])

  const notif = (type, text) => {
    setNotification({type, text})
    setTimeout(() => {
      setNotification(null)
      },4000)
    }

  const addContact = newContact => {
    pbservice.addContact(newContact).then((response) => {
        setPersons(persons.concat(response))
        notif('success',  `Added ${newContact.name}`)
      })
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newPerson.name)
    if(exists) {
      const text = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      if(window.confirm(text)) {
        pbservice.replaceNumber(exists.id, newPerson)
        .then(() => {
          setPersons(persons.map(person => person.id === exists.id ? {...newPerson, id: exists.id} : person))
          notif('success',  `Changed ${exists.name}'s number`)
        }
        )
      }
    }else{
      addContact(newPerson)
    }
    setNewPerson({name: '', number: ''})
  }

  const handleChangeName = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleChangeNumber = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name} ?`)) {
      pbservice.deleteContact(person.id).then(() =>
        setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }

  const filterPerson = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Search filter={filter} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <Form onSubmit = {handleAddPerson} person = {newPerson} change1 = {handleChangeName} change2 = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <People filtered = {filterPerson} handleDelete={ handleDelete }/>
    </div>
  )
}

export default App