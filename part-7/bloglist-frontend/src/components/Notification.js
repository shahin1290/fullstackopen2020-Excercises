import React from 'react'

const Notification = ({ notification, setNotification }) => {
  const removeNotification = () => {
    setTimeout(() => {
      setNotification({ ...notification, message: null, type: '' })
    }, 5000)
  }

  if (notification.message === null) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
      {removeNotification()}
    </div>
  )
}

export default Notification
