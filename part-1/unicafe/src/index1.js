import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(1)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodFeedback = () => {
    setGood(good + 1)
  }
  const incrementNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }
  const incrementBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incrementGoodFeedback}>good</button>
      <button onClick={incrementNeutralFeedback}>neutral</button>
      <button onClick={incrementBadFeedback}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
