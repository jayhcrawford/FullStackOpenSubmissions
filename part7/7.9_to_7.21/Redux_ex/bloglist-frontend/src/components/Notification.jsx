import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (props.notification) {
    return <div style={style}>{props.notification.message}</div>
  } else {
    return null
  }
}

export default Notification
