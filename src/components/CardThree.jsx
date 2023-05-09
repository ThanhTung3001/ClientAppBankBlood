import React from 'react';
import {MdJoinFull} from 'react-icons/md'

const CardThree = ({value}) => {
  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <MdJoinFull size={24} color='#0055ff'/>
      </div>  
      <div className="flex w-full justify-center">
        
      </div>
      <div className='mt-4 flex items-end justify-center'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white text-center'>
            {value}
            </h4>
          <span className='text-sm font-medium text-center w-full'>New donate on month</span>
        </div>

       
      </div>
    </div>
  )
}
export default CardThree;
