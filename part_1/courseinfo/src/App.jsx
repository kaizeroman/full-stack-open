const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return <p>{props.part} {props.exer}</p>
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((value, index) => <Part key = {index} part = {value.name} exer = {value.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.map(value => sum +=value.exercises)
  return <p>Number of Exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}


export default App
