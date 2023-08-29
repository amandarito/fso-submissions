const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)
  // where (a, b) are (accumulator, next element), and 0 is the initial accumulator.
  return <b>Total of {total} exercises</b>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Course = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  ))
}

export default Course
