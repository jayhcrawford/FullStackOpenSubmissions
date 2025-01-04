import React from "react"

import { useNotifierValue } from "../NotifierContext"


const Notification = () => {
  const notification = useNotifierValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Notification
