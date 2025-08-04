"use client";
import {React,useContext} from 'react';
import Image from 'next/image';
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'; 

function SideBar() {
    const { userCourseList } = useContext(UserCourseListContext);
    const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <IoHomeOutline />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Explore',
      icon: <MdOutlineExplore />,
      path: '/dashboard/explore',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: <GrUpgrade />,
      path: '/dashboard/upgrade',
    },
    {
      id: 4,
      name: 'Logout',
      icon: <TbLogout2 />,
      path: '/sign',
    },
  ];

    const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
        <Image alt="placeholder"  src={'/new logo.png'} width={100} height={100} />
        <hr className="my-5" />
        <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  item.path === path && 'bg-gray-100 text-black'
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%] ">
        <Progress value={(userCourseList?.length / 5) * 100} />
        <h2 className="text-sm my-2 ">{userCourseList?.length} out of 5 created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generation
        </h2>
      </div>

    </div>
  )
}

export default SideBar