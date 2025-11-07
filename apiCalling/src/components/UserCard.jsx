
import React from 'react'

export default function UserCard(props) {
  return (
    <div className='user-card'>
        <img className='user-img' />
        <h4>{props.data.name.first}</h4>
        <p>{props.data.phone}</p>
        <p>{props.data.location.city},{props.data.location.state}</p>
    </div>
  )
}
