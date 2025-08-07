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
      <Part part={props.part1} exer = {props.exer1} />
      <Part part={props.part2} exer = {props.exer2} />
      <Part part={props.part3} exer = {props.exer3} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of Exercises {props.exer1+props.exer2+props.exer3}</p>
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1.name} exer1 = {part1.exercises} part2 = {part2.name} exer2 = {part2.exercises} part3 = {part3.name} exer3 = {part3.exercises}/>
      <Total exer1 = {part1.exercises} exer2 = {part2.exercises} exer3 = {part3.exercises} />
    </div>
  )
}


export default App
