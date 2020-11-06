import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({
  good,
  bad,
  neutral,
  totalFeedback,
  averageFeedback,
  positiveFeedbackPercentage,
}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalFeedback()}</p>
      <p>average {averageFeedback()}</p>
      <p>positive {positiveFeedbackPercentage()} %</p>
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

  const totalFeedback = () => good + neutral + bad
  const averageFeedback = () =>
    (good * 1 + neutral * 0 + bad * -1) / totalFeedback()
  const positiveFeedbackPercentage = () => (good / totalFeedback()) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incrementGoodFeedback}>good</button>
      <button onClick={incrementNeutralFeedback}>neutral</button>
      <button onClick={incrementBadFeedback}>bad</button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback}
        averageFeedback={averageFeedback}
        positiveFeedbackPercentage={positiveFeedbackPercentage}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
