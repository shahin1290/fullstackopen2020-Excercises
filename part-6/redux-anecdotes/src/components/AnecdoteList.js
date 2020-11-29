import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification('A vote is added'))
    setTimeout(() => dispatch(removeNotification()), 3000)
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
