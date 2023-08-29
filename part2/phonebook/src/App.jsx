import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('green')

  useEffect(() => {
    personService.getAll().then(initialList => {
      setPersons(initialList)
    })
  }, [])

  const handleFormSubmit = event => {
    event.preventDefault()
    // person is already in phonebook
    if (persons.find(person => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in phonebook, replace the old number with a new one?`
        )
      ) {
        // update number
        const newPerson = { name: newName, number: newNumber }
        const personId = persons.find(p => p.name === newName).id
        personService
          .update(personId, newPerson)
          .then(person => {
            setPersons(persons.map(p => (p.id !== personId ? p : person)))
          })
          .catch(error => {
            setColor('red')
            setNotification(`${newName} has already been deleted.`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
        return
      } else {
        return
      }
    }

    // person not yet in phonebook
    const newPerson = { name: newName, number: newNumber }
    personService.create(newPerson).then(person => {
      setPersons(persons.concat(person))
      setColor('green')
      setNotification(`Added ${person.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setQuery(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase())
  )

  const toHandleDelete = id => {
    console.log(`id ${id} deleting?`)
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService.remove(id)
    }
    setPersons(persons.filter(p => p.id !== id))
  }

  return (
    <div>
      <h2>phonebook</h2>
      <Notification message={notification} color={color} />
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>numbers</h2>
      <Persons persons={personsToShow} handleDelete={toHandleDelete} />
    </div>
  )
}

export default App
