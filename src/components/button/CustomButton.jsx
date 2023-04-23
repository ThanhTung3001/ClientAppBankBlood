import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import'./buttonStyle.scss';
 const CustomButton = ({onClick,content,classname}) => {
  return (
    <button onClick={onClick} className={`hover:bg-red-400 bg-white flex justify-center items-center btn btn-primary border-white text-black ${classname} `}>{content} <div className="btn btn-primary ml-2 p-2 bg-green-500 border-green-500"><AiOutlineArrowRight/></div></button>
  )
}
export default CustomButton;