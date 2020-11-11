import React from 'react'

const Notification = ({ notification, setNotification }) => {
  if (notification.message === null) {
    return null
  }

  return (
    <div className='error'>
      {notification.message}
      {setTimeout(() => {
        setNotification({...notification, message: null})
      }, 1000)}
    </div>
  )
}

export default Notification
