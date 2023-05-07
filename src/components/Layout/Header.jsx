import React, { useEffect, useState } from 'react'
import './index.scss';
import { Link } from 'react-router-dom';
import {AiOutlineMenuFold} from'react-icons/ai';
import Drawer from '../drawer';

export const arrayMenu = [
    {
        name:'Home',
        path:'/'
    },
    {
        name:'About',
        path:'/about'
    }, {
        name:'Event',
        path:'/campaing'
    },  {
        name:'Blog',
        path:'/blogs'
    },  {
        name:'Contact',
        path:'/contact'
    },
    
];



export const Header = () => {

    const [select,setSelected] = useState(0);
    const [headerScroll,setHeaderScroll] = useState(false);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    },[]);
    const handleScroll = () => {
        if (window.scrollY >30) {
            setHeaderScroll(true);
        }else{
            setHeaderScroll(false);
        }
      };
  return (
       <>
        <header className={`flex justify-center fixed top-8 w-full h-[60px] z-20 `}>
            <button className=" p-2 rounded-full h-12 w-12 bg-[#111551] flex justify-center items-center absolute sm:hidden right-4 top-8" onClick={()=>setOpen(!open)}><AiOutlineMenuFold color='white' size={24}/></button>
            <div className={`flex container top-header  rounded-md w-full z-1 items-center ${headerScroll===true?"scroll-header":""}`}>
                    <Link to={'/'} className="logo font-bold text-xl pl-4 cursor-pointer w-full sm:w-1/3 text-center sm:text-left">
                        BloodBank
                    </Link>
                    <div className="hidden sm:flex menu w-full sm:w-2/3 sm:justify-end">
                            <ul className="flex justify-center ">
                                {
                                    (arrayMenu).map((e,index)=>{
                                      return  <li key={index} className={`item ${index===select?'item-active':''}`} onClick={()=>{
                                         setSelected(index);
                                      }}><Link to={e.path}>{e.name}</Link></li>
                                    })
                                }
                            </ul>
                           
                    </div>

            </div>
        </header>
        <Drawer isOpen={open} onClose={()=>{setOpen(false)}}/>
       </>
  )
}
