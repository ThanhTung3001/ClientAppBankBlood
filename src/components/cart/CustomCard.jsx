import React from 'react';
import './card.scss';
import { Tooltip } from 'antd';

export const CustomCard = ({number,title,body,className}) => {
  return (
    <div className="w-full sm:w-1/4">
    <div className="process-wrapper p-2 flex-col flex">
            <div className="number-icon flex justify-center sm:justify-start">
                    <div className={`number h-[65px] w-[65px] rounded-3xl flex justify-center items-center text-center ${className} text-3xl`}>
                            {number}
                    </div>
            </div>
          <Tooltip title={body}>
          <div className="processing-content mt-4">
                    <h3 className='text-2xl font-bold text-center sm:text-left'>{title}</h3>
                    <p className='text-md text-gray-600 mt-2 text-center  sm:text-left'>{body}</p>
            </div>
          </Tooltip>
    </div>
</div>
  )
}
