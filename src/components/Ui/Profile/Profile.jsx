import { UserNav } from '@/components/Table/TableComponents/UserNav'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Profile = ({ img }) => {
  return (
    <>
    
    <UserNav img={img}/>
    </>
  )
}

export default Profile