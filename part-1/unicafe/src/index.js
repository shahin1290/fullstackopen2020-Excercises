import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }
  const totalFeedback = () => good + neutral + bad
  const averageFeedback = () =>
    (good * 1 + neutral * 0 + bad * -1) / totalFeedback()
  const positiveFeedbackPercentage = () => (good / totalFeedback()) * 100
  return (
    <div>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={totalFeedback()} />
      <Statistic text='average' value={averageFeedback()} />
      <Statistic text='positive' value={`${positiveFeedbackPercentage()} %`} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodFeedback = () => setGood(good + 1)
  const incrementNeutralFeedback = () => setNeutral(neutral + 1)
  const incrementBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGoodFeedback} text='good' />
      <Button handleClick={incrementNeutralFeedback} text='neutral' />
      <Button handleClick={incrementBadFeedback} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
