import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const totalSearches = persons.filter(person => person.name.toLowerCase() === newSearch.toLowerCase()).reduce((acc, person) => acc.concat(person), [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} totalSearches={totalSearches}/> 
      <h2>Add a New Contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleName={handleName} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App

