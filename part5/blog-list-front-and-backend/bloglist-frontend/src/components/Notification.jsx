import React from "react";

const Notification = (props) => {
  if (props.notification === null) {
    //no alert
    return null;
  } else if (props.notification.type === 'red') {
    //alert that is red
    return (
      <div className="error">{props.notification.text}</div>
    )
  } else if (props.notification.type === 'green') {
    //alert that is green
    return (
      <div className="goodAlert">{props.notification.text}</div>
    )
  }

}

export default Notification
