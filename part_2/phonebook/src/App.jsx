import Search from './components/Search'
import Form from './components/Form'
import People from './components/People'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(promise => {
        setPersons(promise.data)
  })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if(exists) {
      window.alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
    }
    console.log(persons)
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

  const filterPerson = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <Form onSubmit = {handleAddPerson} value1 = {newName} change1 = {handleChangeName} value2 = {newNumber} change2 = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <People filtered = {filterPerson} />
    </div>
  )
}

export default App