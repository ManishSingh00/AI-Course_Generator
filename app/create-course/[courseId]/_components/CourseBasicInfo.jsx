import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiOutlinePuzzle } from "react-icons/hi";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import axios from 'axios';

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64 = reader.result;

    try {
      const res = await axios.post('/api/upload-image', {
        fileBase64: base64
      });

      const downloadUrl = res.data.url;
      setSelectedFile(downloadUrl);

      await db.update(CourseList).set({
        courseBanner: downloadUrl
      }).where(eq(CourseList.id, course?.id));

      refreshData(true);

    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  reader.readAsDataURL(file); // Convert image to base64
};


  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5 relative'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name} 
               {edit && <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)} />} </h2>
                <p className='text-sm text-gray-400 mt-3 '>{course?.courseOutput?.course?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-blue-500'><HiOutlineRectangleStack />{course?.category}</h2>
                 {!edit &&<Link href={'/course/'+course?.courseId+"/start"}>

                  <Button className="w-full mt-5 bg-blue-500">Start</Button>
                 </Link>}
           
            </div>
            <div>
                <label htmlFor='upload-image'>
                  <Image alt="placeholder" src={selectedFile?selectedFile:'/placeholder.png'} width={300} height={300}
                  className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
                </label>
              {edit &&  <input type="file" id="upload-image" 
                className='opacity-0' onChange={onFileSelected} />}
            </div>
        </div>
    </div>
  )
}

export default CourseBasicInfo