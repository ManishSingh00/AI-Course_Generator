"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { useParams } from "next/navigation"

function CourseStart() {
  const { courseId } = useParams()      // ← plain string now
  const [course, setCourse] = useState()
  const [selectedChapter, setSelectedChapter] = useState(0)
  const [chapterContent, setChapterContent] = useState()

  // load course once courseId is available
  useEffect(() => {
    if (!courseId) return
    ;(async () => {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, courseId))
      setCourse(result[0])
    })()
  }, [courseId])

  // load content whenever you change the selected chapter
    const GetSelectedChapterContent=async(chapterId)=>{
      
        const result=await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)));

        setChapterContent(result[0]);
        console.log(result);

    }

  return (
    <div>
        {/* Chapter list Side Bar  */}
        <div className=' fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
            <h2 className='font-medium text-lg bg-blue-500 p-4
            text-white'>{course?.courseOutput?.course?.name}</h2>

            <div>
                {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
                    <div key={index} 
                    className={`cursor-pointer
                    hover:bg-blue-100
                    ${selectedChapter?.name==chapter?.name&&'bg-blue-200'}
                    `}
                    onClick={()=>{setSelectedChapter(chapter);
                    GetSelectedChapterContent(index)
                    }}
                    >
                        <ChapterListCard chapter={chapter} index={index} />
                    </div>
                ))}
            </div>
        </div>
        {/* Content Div  */}
        <div className='md:ml-72'>
            <ChapterContent chapter={selectedChapter}
                content={chapterContent}
            />
        </div>
    </div>
  )
}

export default CourseStart