import { useState } from 'react'


const StatisticLine = (props) => {
  return (
    <tr><td><p>{props.statName}</p></td><td><p>{props.statNum}</p></td></tr>
  )
} 

const SectionHeader = (props) => {
  return (
    <>
    <h1>{props.title}</h1>
    </>
  )
}



const Statistics = (props) => {
  return (
    <>
      <SectionHeader title="statistics" />
      <table>
        <tbody>
      <StatisticLine statName="good" statNum={props.stats.good} />
      <StatisticLine statName="neutral" statNum={props.stats.neutral} />
      <StatisticLine statName="bad" statNum={props.stats.bad} />
      <StatisticLine statName="all" statNum={props.stats.all} />
      <StatisticLine statName="average" statNum={!NaN && props.stats.avg || 0} />
      <StatisticLine statName="positive" statNum={!NaN && props.stats.positive || 0} />
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.buttonText}</button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statsObj = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + bad + neutral,
    avg: (good - bad)/(good+bad+neutral),
    positive: good/(good+bad+neutral)
  }

  const incrementGood = () => {
    const newVal = good + 1;  
    setGood(newVal);
  }

  const incrementNeut = () => {
    const newVal = neutral + 1;
    setNeutral(newVal);
  }

  const incrementBad = () => {
    const newVal = bad + 1;
    setBad(newVal); 
  }



  return (
    <div>
      <SectionHeader title="give feedback"/> 
      <Button buttonText="good" onClick={incrementGood}/>
      <Button buttonText="neutral" onClick={incrementNeut}/>
      <Button buttonText="bad" onClick={incrementBad}/>
      <Statistics stats={statsObj}/>
    </div>
  )
}

export default App    
