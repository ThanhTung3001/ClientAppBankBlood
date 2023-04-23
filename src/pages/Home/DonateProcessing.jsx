import React from 'react'
import { CustomCard } from '../../components/cart/CustomCard'

export const DonateProcessing = () => {
    return (
        <div id="donate-processing" >
            <div className="container flex flex-col justify-center h-full">
                <div className="message w-full sm:w-1/2">
                        <h3 className='text-black text-4xl text-center sm:text-left md:text-left lg:text-left'>Donation process</h3>
                        <p className="text-gray-500 text-md mt-4 sm:text-lg md:text-xl text-center sm:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero repellendus quasi, quos totam quia perspiciatis nisi suscipit, ab eaque delectus aliquid, nostrum impedit deleniti quo vel ullam? Dolore, nobis quas.</p>
                </div>
                <div className="step-processing flex flex-wrap mt-8">
                        <CustomCard 
                        number={1} 
                        body='An award winning agency based
                        in London. Wedesign beautifu
                        products make a difference.'
                        title='Registration'
                        className='bg-[#c8c5f6] text-[#4b47df]'

                        />
                          <CustomCard 
                        number={2} 
                        body='An award winning agency based
                        in London. Wedesign beautiful
                        products make a difference.'
                        title='Screenming'
                        className='bg-[#ffe8b1] text-[#feb503]'
                            
                        />
                          <CustomCard 
                        number={3} 
                        body='An award winning agency based
                        in London. Wedesign beautiful
                        products make a difference.'
                        title='Donation'
                        className='bg-[#d1faf6] text-[#78f1e6]'
                        />
                          <CustomCard 
                        number={4} 
                        body='An award winning agency based
                        in London. Wedesign beautiful
                        products make a difference.'
                        title='Refreshment'
                        className='bg-[#fadcc4] text-[#f08f45]'
                        />
                </div>
            </div>
        </div>
    )
}
