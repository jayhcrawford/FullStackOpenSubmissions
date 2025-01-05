import React from 'react'
import { Alert } from '@mui/material'

const Notification = (props) => {
  console.log(props.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (props.notification && props.notification.style === 'green') {
    return <Alert severity="success">{props.notification.message}</Alert>
  } else if (props.notification && props.notification.style === 'red') {
    return <Alert severity="error">{props.notification.message}</Alert>
  } else {
    return null
  }
}

export default Notification
