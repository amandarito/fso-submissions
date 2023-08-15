import { useState } from 'react'

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatisticLine = props => {
  const { text, value } = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = props => {
  const { good, neutral, bad } = props

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine
            text='average'
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text='positive'
            value={(good / (good + neutral + bad)) * 100 + ' %'}
          />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback!</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
