import React, { useEffect, useState } from 'react'
import services from './services'
import './index.css'


const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const[errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    services
      .getAll()
      .then(response => {
        setPersons(persons.concat(response.data))
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(e => e.name === newName)) {
      const persontoedit = persons.find(obj => {
        return obj.name===newName
      })
      if(window.confirm(`${newName} is already on the phonebook. Would you like to update the number`)){
        services.update(persontoedit.id,personObject).then(response => {
          setPersons(persons.map( person => person.id !== persontoedit.id ? person: response.data))
        })
      }
    }else{
      services
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setErrorMessage(`Person ${newName} Added to phonebook`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
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
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <FilterInput filter={filter} handleFilterChange={handleFilterChange}/>
      <Personform addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <FilteredList persons={persons} filter={filter} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )

}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
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
  let{setPersons, persons, setErrorMessage} = props
  let filtered = props.persons.filter( person => person.name.includes(props.filter) )
  return(
    <div>
    <h2>Numbers</h2>
    <ul>
        {filtered.map(person =>
        <li key={person.name}>{person.name} {person.number} <button onClick={() => {
          if(window.confirm(`Are you sure you want to delete ${person.name}`)){
            services.destroy(person.id).then(
              setPersons(persons.filter(per =>{
              return per.id!==person.id
          })))
          .catch(error => setErrorMessage(`${person.name} was already removed from server`))
              
            }
          }
          } >Delete</button></li>)}
      </ul>
      </div>
  )
}

export default App
