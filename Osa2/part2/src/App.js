import React from 'react'
import { useState } from 'react'


const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
    event.target.reset()
    }

  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput filter={filter} handleFilterChange={handleFilterChange}/>
      <Personform addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <FilteredList persons={persons} filter={filter}/>
    </div>
  )

}

const FilterInput = (props) => {
  const {filter, handleFilterChange} = props
  
  return(
    <div>
      <p>filter</p>
      <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Personform = (props) => {
  const {addPerson,newName,handleNameChange,newNumber,handleNumberChange} = props
return(
  <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

const FilteredList = (props) => {

  let filtered = props.persons.filter( person => person.name.includes(props.filter) )
  
  return(
    <div>
    <h2>Numbers</h2>
    <ul>
        {filtered.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
      </div>
  )
}

export default App
