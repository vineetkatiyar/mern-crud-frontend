/* eslint-disable no-unused-vars */
import React from 'react'
import {BiSolidLeftArrow} from "react-icons/bi"
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const BackButton = ({destination = "/"}) => {
  return (
    <div className='flex'>
     <Link to={destination}>
          <BiSolidLeftArrow className='text-3xl text-orange-700 m-5'/>
     </Link>
    </div>
  )
}

export default BackButton