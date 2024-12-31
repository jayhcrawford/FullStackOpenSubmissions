import { useSelector } from "react-redux"
import { addNotification } from "../reducers/notificationReducer"


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '') {
    return (
      <div></div>
    )
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification