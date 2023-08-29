import PersonLine from './Personline'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <PersonLine
          person={person}
          key={person.name}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons
