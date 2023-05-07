import React, { useEffect } from 'react';
import CustomButton from '../../components/button/CustomButton';
import { Button } from 'antd';
import ScrollReveal from 'scrollreveal';


export const Slogan = () => {
  useEffect(()=>{
    ScrollReveal().reveal('#slogan', {
      delay: 200,
      duration: 600,
      distance: '20px',
      origin: 'left'
    });
  },[]);
  return (
    <div id="hepping-history">
    <div className="container h-full flex flex-wrap">
         <div className="sm:w-9/12 w-full h-full flex justify-center flex-col" id='slogan'>
              <h3 className='text-white text-2xl text-center font-bold sm:text-left sm:text-4xl'>We are helping people from 10 years</h3>
                <p className="text-md mt-2 text-white sm:mt-4 text-center sm:text-left">As a result, the number of people who have donated blood through this website has steadily increased over the years. In addition, advancements in technology have made it easier for donors to schedule appointments, track their donation history, and receive updates on their blood's impact.</p>
         </div>
         <div className="sm:w-3/12 w-full flex flex-col justify-center items-center sm:items-end">
         <button className="button-36 mt-6" role="button">Donate Now</button>
              {/* <CustomButton/> */}
         </div>
    </div>
</div>
  )
}
