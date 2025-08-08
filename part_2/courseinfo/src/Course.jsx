const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part key = {part.id} name={part.name} exercises={part.exercises}/>) }
        </>
    )
}
  
const Header = ({cname}) => <h2>{cname}</h2>

const Course = ({course}) => {
    const total = course.parts.reduce((sum,part) => sum+part.exercises, 0)
    return(
      <>
        <Header cname = {course.name} />
        <Content parts = {course.parts} />
        <b>total of {total} exercises</b>
      </>
    )
}

export default Course