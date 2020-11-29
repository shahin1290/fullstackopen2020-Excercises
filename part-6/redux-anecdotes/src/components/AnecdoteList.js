import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ filter, anecdotes, addVote, setNotification }) => {
  const anecdotesToShow = () => {
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (anecdote) => {
    addVote(anecdote)
    setNotification(`you voted '${anecdote.content}'`, 10)
  }
  return (
    <div>
      {anecdotesToShow().map((anecdote) => (
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
})

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
