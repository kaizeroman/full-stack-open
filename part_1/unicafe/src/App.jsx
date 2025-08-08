import { useState } from 'react'

const Button = ({name, onClick}) => <button onClick = {onClick}>{name}</button>

const Display = ({name, number}) => <p>{name} {number}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)
  const totalFeedback = () => good+neutral+bad
  const calculateAverage = () => (good - bad)/totalFeedback()
  const calculatePositive = () => (good/totalFeedback())*100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {addGood} name = 'good'/>
      <Button onClick = {addNeutral} name = 'neutral'/>
      <Button onClick = {addBad} name = 'bad'/>
      <h1>statistics</h1>
      <Display name = 'good' number = {good} />
      <Display name = 'neutral' number = {neutral} />
      <Display name = 'bad' number = {bad} />
      <Display name = 'all' number = {totalFeedback()} />
      <Display name = 'average' number = {calculateAverage()}/>
      <Display name = 'positive' number = {`${calculatePositive()} %`} />
    </div>
  )
}

export default App