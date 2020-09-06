import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0, 
    4: 0,
    5: 0 
  })

  let randomNum = Math.floor(Math.random() * 6)

  const handleNext = () => {
    if (randomNum === selected) {
      randomNum = Math.floor(Math.random() * 6)
    }
    console.log(randomNum)
    setSelected(randomNum)
  }

  const handleVote = () => {
    setVote({
      ...vote,
      [selected]: vote[selected] + 1
    })
  }

  let maxIndex = 0
  let maxVal = 0
  for (let i = 0; i < 6; ++i) {
    if (vote[i] > maxVal) {
      maxIndex = i
      maxVal = vote[i]
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button> 
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <p>has {maxVal} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
