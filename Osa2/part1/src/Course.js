import React from "react"

const Header =(props) => {
  const {name} = props;
  return(
  <>
      <h1>{name}</h1>
  </>
  )
}

const Part =(props) => {
  const {part,exercises} = props;
  return(
    <p>{part} {exercises}</p>
  )
}

const Content =(props) => {
  const {course} = props; 

  var total = course.parts.reduce(function(sum, exercises){
    return sum + exercises.exercises
  }, 0)

  return(
    <>
      <ul>
        {course.parts.map(part =>
        <li key={part.id}><Part part={part.name} exercises={part.exercises} /></li>)}
      </ul>
          total amount of exercises {total}
    </>
  )
}

const Course = (props) => {
  const {course} = props;
  return(
    <div>
      <Header name={course.name} />
      <Content course={course}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <ul>
        {courses.map(course =>
        <li key={course.id}><Course course={course} /></li>)}
      </ul>
    </div>
  )
}

export default App
