import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [percentage, setPercentage] = useState(0)


  const handlegood = () => {
      setGood(good+1)
      setTotal((good*1 + neutral*0 + bad*-1)/(good+bad+neutral))
      setPercentage(good*100/(good+bad+neutral))
  }
  const handlebad = () => {
    setBad(bad+1)
    setTotal((good*1 + neutral*0 + bad*-1)/(good+bad+neutral))
    setPercentage(good*100/(good+bad+neutral))
}
const handleneutral = () => {
  setNeutral(neutral+1)
  setTotal((good*1 + neutral*0 + bad*-1)/(good+bad+neutral))
  setPercentage(good*100/(good+bad+neutral))
}
  return (
    <div>
      <h1>Give Feedback</h1>
      <FBButton handleclick={handlegood} text={"good"}/>
      <FBButton handleclick={handleneutral} text={"neutral"}/>
      <FBButton handleclick={handlebad} text={"bad"}/>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} percentage={percentage}/>
      
    </div>
  )
}

const FBButton = (props) => {
  return(
  <button onClick={props.handleclick}>{props.text}</button>
  )
}


const StatisticsTableRow = (props) => {
  return(
    <tr>
    <td>{String(props.name)}</td>
    <td>{String(props.value)}</td>
    </tr>
  )
}
const StatisticsTable = (props) => {
  return(
    <table>
      <tbody>
      <StatisticsTableRow name ={"positive reviews"} value ={props.good} />
      <StatisticsTableRow name ={"Neutral reviews"} value ={props.neutral} />
      <StatisticsTableRow name ={"Negative reviews"} value ={props.bad} />
      <StatisticsTableRow name ={"Total reviews"} value ={props.total} />
      <StatisticsTableRow name ={"Percentage of good reviews"} value ={props.percentage} />
      </tbody>
    </table>
  )
}

const Statistics = (props) =>{
  if(props.good+props.bad+props.neutral >0){
  return (
    <div>
      <StatisticsTable good={props.good} neutral={props.neutral} bad={props.bad} total={props.total} percentage={props.percentage}/>
    </div>
  )}else{
    return(
      <div></div>
    )

  }
}


export default App
