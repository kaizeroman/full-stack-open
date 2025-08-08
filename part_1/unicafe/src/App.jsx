import { useState } from 'react'

const Button = ({name, onClick}) => <button onClick = {onClick}>{name}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = () => good+neutral+bad
  const calculateAverage = () => (good - bad)/totalFeedback()
  const calculatePositive = () => (good/totalFeedback())*100
  if(totalFeedback() === 0){
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text = 'good' value = {good} />
        <StatisticLine text = 'neutral' value = {neutral} />
        <StatisticLine text = 'bad' value = {bad} />
        <StatisticLine text = 'all' value = {totalFeedback()} />
        <StatisticLine text = 'average' value = {calculateAverage()}/>
        <StatisticLine text = 'positive' value = {`${calculatePositive()} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {() => setGood(good+1)} name = 'good'/>
      <Button onClick = {() => setNeutral(neutral+1)} name = 'neutral'/>
      <Button onClick = {() => setBad(bad+1)} name = 'bad'/>
      <h1>statistics</h1>
      <Statistics good= {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App