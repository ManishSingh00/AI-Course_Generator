"use client"
import React, { useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
const AddCourse = () => {
    const {user} = useUser();
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)
  return (
    <div className='flex items-center justify-between'>
        <div>
            <div className='text-2xl'>Hello, 
            <span className='font-bold'>{user?.fullName}</span></div>
            <p className='text-sm text-gray-500'>Create AI-powered courses — share them if you like!</p>
        </div>
        <Link href={userCourseList?.length>=5 ?'/dashboard/upgrade':'/create-course'}>
            <Button className="bg-blue-500 hover:bg-gray-500">+ Create AI Course</Button>
        </Link>
    </div>
  )
}

export default AddCourse