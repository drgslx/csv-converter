import React from 'react'

const UsersCard = ({user}) => {
  return (
    <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
    </div>
  )
}

export default UsersCard