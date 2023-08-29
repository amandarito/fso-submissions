const PersonLine = ({ person, handleDelete }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default PersonLine
