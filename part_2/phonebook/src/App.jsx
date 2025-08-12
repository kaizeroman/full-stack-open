import Search from './components/Search'
import Form from './components/Form'
import People from './components/People'
import { useState, useEffect } from 'react'
import pbservice from './services/Phonebook'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => { 
    pbservice.getAllContacts().then(data => setPersons(data) )
   }, [])

  const addContact = newContact => {
    pbservice.addContact(newContact)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName)
    if(exists) {
      const text = `${newName} is already added to phonebook, replace the old number with a new one?`
      if(window.confirm(text)) {
        const newContact = {...exists, number:newNumber}
        pbservice.replaceNumber(exists.id, newContact)
        .then(response => {
          setPersons(persons.map(person => person.id === newContact.id ? response.data : person))
        }
        )
      }
    }else{
      const newContact = {name: newName, number: newNumber, id: (persons.length+1).toString()}
      addContact(newContact)
      setPersons(persons.concat(newContact))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name} ?`)) {
      pbservice.deleteContact(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }

  const filterPerson = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <Form onSubmit = {handleAddPerson} value1 = {newName} change1 = {handleChangeName} value2 = {newNumber} change2 = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <People filtered = {filterPerson} handleDelete={ handleDelete }/>
    </div>
  )
}

export default App