import Search from './components/Search'
import Form from './components/Form'
import People from './components/People'
import { useState, useEffect } from 'react'
import pbservice from './services/Phonebook'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => { 
    pbservice.getAllContacts().then(data => setPersons(data) )
   }, [])

  const addContact = newContact => {
    pbservice.addContact(newContact)
      .then(response => console.log(response.name + ' added'))
  }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if(exists) {
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newContact = {name: newName, number: newNumber, id: (persons.length+1).toString()}
      addContact(newContact)
      setPersons(persons.concat(newContact))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    console.log(event.target.value)
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
  console.log("hey")
  console.log(filterPerson)

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