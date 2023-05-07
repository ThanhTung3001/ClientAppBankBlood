import React from 'react'
import './about.scss';

export const About = () => {
  return (
    <div id="about" >
      <div className="flex container mb-32 flex-column justify-center item-center h-full flex-wrap-reverse wrapper-about">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className='font-bold
               text-black
                text-left
                text-2xl
                mb-4
                sm:text-4xl
               '>ABOUT BANKBLOOD</h3>
          <p className='text-sm sm:text-base'>
          Blood Bank is a mobile application that serves as a platform to connect blood donors with patients in need of blood transfusions. With the app, users can register as blood donors, search for nearby blood banks, and schedule blood donations at their convenience.

The app allows users to set up a personal profile with their blood type, location, and availability for donation. Once registered, users can receive notifications of nearby blood donation events and requests for blood donations from local hospitals and blood banks.

Blood Bank also provides a feature for emergency blood requests, where hospitals can post urgent requests for blood donations, and users within the vicinity can respond quickly to donate blood.

The app provides an easy-to-use interface that makes it simple for donors to track their donation history, manage their appointments, and receive updates on their eligibility to donate blood.

Overall, Blood Bank aims to simplify the process of blood donation and help bridge the gap between blood donors and patients in need of blood transfusions.
Download for mobile devices.

          </p>
         <div className="flex w-full">
         <button className="button-36 mt-8" role="button">Contact Now</button>
         </div>
        </div>
        <div className="w-full sm:w-1/2 flex justify-center flex-col items-center mb-8 sm:mb-0">
            <div className="about-img">
                <img
                  className='rounded-xl'
                src="../images/teacher-home-docter-can-great-teacher-for-science-students-specially-biology-till-12th.jpg" alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}
