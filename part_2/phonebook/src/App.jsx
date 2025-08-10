import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
      <div>
        filter shown with <input value={ filter } onChange={handleSearch}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPerson.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App