const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE': {
      const { id } = action.data
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return { type: 'INIT_ANECDOTES', data: anecdotes }
}

export const addVote = (id) => {
  return { type: 'ADD_VOTE', data: { id } }
}

export const createAnecdote = (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  return { type: 'NEW_ANECDOTE', data: { content, id: getId(), votes: 0 } }
}

export default anecdoteReducer
