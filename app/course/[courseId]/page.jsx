"use client"
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function Course() {
  const { courseId } = useParams()  
  const [course, setCourse] = useState()

  useEffect(() => {
    if (!courseId) return
    async function load() {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, courseId))
      setCourse(result[0])
    }
    load()
  }, [courseId])

  return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44'>
        <CourseBasicInfo course={course} edit={false} />

        <CourseDetails course={course} />

        <ChapterList course={course}  edit={false}/>
        </div>
    </div>
  )
}

export default Course