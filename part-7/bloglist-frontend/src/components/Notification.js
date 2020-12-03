import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return notification.message ? (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  ) : null
}

export default Notification
