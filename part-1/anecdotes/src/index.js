import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ selected, points, text }) => {
  if (text === 'day') {
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>
    )
  }

  if (text === 'most') {
    const indexOfHighestVotedAnecdote = () =>
      points.indexOf(Math.max(...points))
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[indexOfHighestVotedAnecdote()]}</p>
        <p>has {points[indexOfHighestVotedAnecdote()]} votes</p>
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const selectRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Anecdote selected={selected} points={points} text='day' />
      <Button handleClick={addVote} text='vote' />
      <Button handleClick={selectRandomAnecdote} text='next anecdote' />
      <Anecdote selected={selected} points={points} text='most' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
