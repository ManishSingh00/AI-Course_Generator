"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter, useParams } from 'next/navigation'

function CourseLayout() {
  const params = useParams(); 
  const { user } = useUser();
  const [course,setCourse]=useState([]);
  const [loading,setLoading]=useState(false);
  const router=useRouter();
   useEffect(() => {
    if (params && user) GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(and(
        eq(CourseList.courseId, params?.courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      ));

    setCourse(result[0]);
    console.log(result);
  };

 const GenerateChapterContent = async () => {
  setLoading(true);
  const chapters = course?.courseOutput?.course?.chapters;

  if (!Array.isArray(chapters)) return;

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];

    const PROMPT = `Return a JSON array of sections with fields: title, description, and code (in <precode> format if applicable). Topic: ${course?.name}, Chapter: ${chapter?.name}`;
    
    try {
      // Step 1: Generate Video
      const videoResp = await service.getVideos(`${course?.name}:${chapter?.name}`);
      const videoId = videoResp?.[0]?.id?.videoId || '';

      // Step 2: Generate Chapter Content
      const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
      const text = await result?.response?.text();
      const content = JSON.parse(text);

      // Debug check
      if (!Array.isArray(content)) {
        console.warn(`Expected array for chapter ${index}, got:`, content);
      }

      // Step 3: Insert into DB
      const insertResp = await db.insert(Chapters).values({
        chapterId: index,
        courseId: course?.courseId,
        content,
        videoId
      }).returning({ id: Chapters.id });

      console.log(insertResp);

    } catch (e) {
      console.error(`Failed to generate chapter ${index}:`, e);
    }
  }

  // Final steps after all chapters are processed
  await db.update(CourseList).set({ publish: true });
  setLoading(false);
  router.replace(`/create-course/${course?.courseId}/finish`);
};

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialog loading={loading} />
      {/* Basic Info  */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()} />
      {/* Course Detail  */}
        <CourseDetails course={course} />
      {/* List of Lesson  */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>

      <Button onClick={GenerateChapterContent} className="my-10 bg-blue-400 text-white hover:bg-blue-700">Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout