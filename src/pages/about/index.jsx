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
          <p className='text-sm sm:text-base'>Bankblood is a non-profit organization that operates as a blood donation website to connect blood donors with individuals and hospitals in need of blood transfusions. The website was created with the aim of addressing the shortage of blood supply in many countries and regions around the world.

            The website is user-friendly and easy to navigate, allowing users to register as blood donors or search for blood donors in their area. Registered donors can create a profile that includes their blood type, contact information, and availability to donate blood. This information is then made available to hospitals and individuals who need blood transfusions.

            Bankblood also provides educational resources about blood donation and the importance of maintaining a healthy blood supply. This includes information about the different blood types, eligibility criteria for blood donors, and the process of donating blood.

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
