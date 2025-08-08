
const App = () => {

  const Part = ({name, exercises}) => <p>{name} {exercises}</p>
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key = {part.id} name={part.name} exercises={part.exercises}/>) }
      </>
    )
  }
  
  const Header = ({cname}) => <h1>{cname}</h1>
  const Course = ({course}) => {
    return(
      <>
        <Header cname = {course.name} />
        <Content parts = {course.parts} />
      </>
    )
  }

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
