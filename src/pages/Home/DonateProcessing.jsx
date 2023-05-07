import React from 'react'
import { CustomCard } from '../../components/cart/CustomCard'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'antd'

export const DonateProcessing = () => {
    return (
        <div id="donate-processing" >
            <div className="container flex flex-col justify-center h-full">
                <div className="message w-full sm:w-1/2">
                        <h3 className='text-black text-4xl text-center sm:text-left md:text-left lg:text-left'>Donation process</h3>
                        <p className="text-gray-500 text-md mt-4 sm:text-lg md:text-xl text-center sm:text-left">
                          <Tooltip title="To donate blood, a person must meet certain eligibility criteria, such as being in good health, weighing a minimum of 40 kilograms, and having a hemoglobin level within a certain range. Donors are screened for infectious diseases and other medical conditions to ensure the safety of both the donor and the recipient.">
                          To donate blood, a person must meet certain eligibility criteria, such as being in good health, weighing a minimum of 40 ...
                        </Tooltip>
                        </p>
                </div>
                <div className="step-processing flex flex-wrap mt-8">
                        <CustomCard 
                        number={1} 
                        body='The first step is to register yourself on the blood donation app.'
                        title='Registration'
                        className='bg-[#c8c5f6] text-[#4b47df]'

                        />
                          <CustomCard 
                        number={2} 
                        body='When you arrive at the donation center, you will be given a physical examination to ensure that you are eligible to donate blood.'
                        title='Screenming'
                        className='bg-[#ffe8b1] text-[#feb503]'
                            
                        />
                          <CustomCard 
                        number={3} 
                        body=' You will need to provide your information and donate blood.'
                        title='Donation'
                        className='bg-[#d1faf6] text-[#78f1e6]'
                        />
                          <CustomCard 
                        number={4} 
                        body='After your donation is complete, you will receive a confirmation message that your donation has been successful and that your blood will be used to save lives'
                        title='Refreshment'
                        className='bg-[#fadcc4] text-[#f08f45]'
                        />
                        {/* <Tooltip /> */}
                </div>
            </div>
        </div>
    )
}
