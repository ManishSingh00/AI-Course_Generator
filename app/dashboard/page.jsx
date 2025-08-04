import React from 'react'
import { UserButton } from '@clerk/nextjs'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

function Dashboard() {
  return (
    <div>
       {/* <UserButton/> */}
       <AddCourse/>
       <UserCourseList/>
    </div>
  )
}

export default Dashboard