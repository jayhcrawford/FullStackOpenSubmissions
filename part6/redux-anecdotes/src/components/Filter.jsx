import React from "react";


const Filter = (props) => {
  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>

  )
}

export default Filter
