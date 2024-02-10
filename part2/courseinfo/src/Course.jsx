const Header = ({ course }) => <h1>{course}</h1>


const Total = ({sum}) => <p><b>Total of {sum} exercises</b></p>


const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)} 
    </>
    )
}
  
 const Course = ({course}) => {
  return (
    <>
      {course.map(course => {
        return (
          <ul key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total sum={course.parts.reduce((accumulator, course) => {return accumulator + course.exercises}, 0)}/>
          </ul>
        )
      })}
    </>
  )
}

export default Course
