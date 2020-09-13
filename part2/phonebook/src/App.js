import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

import phoneService from './services/comm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhones => {
        setPersons(initialPhones)
      })
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const findPerson = persons.filter(person => person.name === newName)

    if (findPerson.length !== 0) {
      const confirmPut = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmPut) {
        phoneService
          .put(findPerson[0].id, personObject)
          .then(returnedPhones => {
            setPersons(persons.map(p => p.id !== findPerson[0].id ? p : returnedPhones))
          }).catch(error => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          })
      }
      setMessage(`Changed ${newName}'s phone number`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setNewName('')
      setNewNumber('')
    } else {
      phoneService
        .create(personObject)
        .then(returnedPhones => {
          setPersons(persons.concat(returnedPhones))
        })
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      phoneService
        .remove(id)
        .then(() => {
          const filteredPersons = persons.filter(p => p.id !== id)
          setPersons(filteredPersons)
        })
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

  const Notification = ({message}) => {
    const messageStyle = {
      color: 'green',
      background: 'lightgreen',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message === '') {
      return null
    }

    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} persons={persons} newSearch={newSearch}/> 
      <h2>Add a New Contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleName={handleName} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App

