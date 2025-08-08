import { useState } from 'react'

const Button = ({name, onClick}) => <button onClick = {onClick}>{name}</button>

const Display = ({name, number}) => <p>{name} {number}</p>

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = () => good+neutral+bad
  const calculateAverage = () => (good - bad)/totalFeedback()
  const calculatePositive = () => (good/totalFeedback())*100
  return (
    <>
      <Display name = 'good' number = {good} />
      <Display name = 'neutral' number = {neutral} />
      <Display name = 'bad' number = {bad} />
      <Display name = 'all' number = {totalFeedback()} />
      <Display name = 'average' number = {calculateAverage()}/>
      <Display name = 'positive' number = {`${calculatePositive()} %`} />
    </>
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