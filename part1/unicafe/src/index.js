import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistic = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.goodStats + props.neutralStats + props.badStats
  const cumulated = props.goodStats - props.badStats

  if (props.goodStats === 0 && props.neutralStats === 0 && props.badStats === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <Statistic text='good' value={props.goodStats} />
      <Statistic text='neutral' value={props.neutralStats} />
      <Statistic text='bad' value={props.badStats} />
      <Statistic text='all' value={all} />
      <Statistic text='average' value={cumulated / all} />
      <Statistic text='positive' value={props.goodStats / all * 100 } />
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='give feedback'/>
      <Button name='good' handleClick={() => setGood(good + 1)}/>
      <Button name='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button name='bad' handleClick={() => setBad(bad + 1)}/>
      <Header title='statistics'/>
      <Statistics goodStats={good} neutralStats={neutral} badStats={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

