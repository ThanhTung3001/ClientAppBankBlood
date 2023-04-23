import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button, DatePicker } from 'antd';
import CustomButton from '../../components/button/CustomButton';
import { Field } from 'formik';
export const Contact = () => {
    return (
        <div id="contact">
            <div className="container h-full flex flex-col justify-center">
                <p className="appointment text-2xl font-bold text-gray-600 mb-0 text-center sm:text-left">Appointment</p>
                <h3 className="text-2xl sm:text-4xl text-center sm:text-left mb-2 sm:mb-4">Good to know
                    helpful information</h3>
                <div className="flex flex-col sm:flex-row sm:p-4">
                    <div className="appointment-commmit mt-0 sm:mt-4 w-full">
                        <div className="appointment-item flex items-center mt-3">
                            <div className="arrow-icon h-6 w-8 bg-green-600 flex items-center">
                                <AiOutlineArrowRight color='white' />
                            </div>
                            <p className='ml-2 text-gray-600 text-md sm:text-lg'>Maintain a healthy iron level by eating iron rich foods.</p>
                        </div>
                        <div className="appointment-item flex items-center mt-1 sm:mt-3">
                            <div className="arrow-icon h-6 w-8 bg-green-600 flex items-center">
                                <AiOutlineArrowRight color='white' />
                            </div>
                            <p className='ml-2 text-gray-600 text-md sm:text-lg'>Drink an extra 16 oz. of water prior to your donation.</p>
                        </div>
                        <div className="appointment-item flex items-center mt-1 sm:mt-3">
                            <div className="arrow-icon h-6 w-8 bg-green-600 flex items-center">
                                <AiOutlineArrowRight color='white' />
                            </div>
                            <p className='ml-2 text-gray-600 text-md sm:text-lg'>Avoid alcohol consumption before your blood donation.</p>
                        </div>
                        <div className="appointment-item flex items-center mt-1 sm:mt-3">
                            <div className="arrow-icon h-6 w-8 bg-green-600 flex items-center">
                                <AiOutlineArrowRight color='white' />
                            </div>
                            <p className='ml-2 text-gray-600 text-md sm:text-lg'>Finally, Try to get a good night sound sleep after donation</p>
                        </div>
                        <div className="appointment-item flex items-center mt-1 sm:mt-3">
                            <div className="arrow-icon h-12 w-8 bg-green-600 flex items-center">
                                <AiOutlineArrowRight color='green' size={64}/>
                            </div>
                            <p className='ml-2 text-gray-600 text-md sm:text-lg'>Remember to bring the donor card or national ID/Passport.</p>
                        </div>
                    </div>
                    <div className="appointment-contact-form w-full mt-4 sm:mt-2 ">
                        <div className="flex flex-col w-full sm:w-4/5">
                            <div className='relative'>
                                <input
                                    name="title"
                                    // value={data.name}
                                    placeholder='Full name'
                                    className='w-full bg-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-4'
                                />

                                <div>
                                </div>
                            </div>
                            <div className='relative'>
                                <input
                                    type='emai'
                                    name="Email"
                                    // value={data.name}
                                    placeholder='Email'
                                    className='w-full bg-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-4'
                                />

                                <div>
                                </div>
                            </div>
                            <div className='relative'>
                                <input
                                    type='emai'
                                    name="phone"
                                    // value={data.name}
                                    placeholder='Phone number'
                                    className='w-full bg-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-4'
                                />

                                <div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <div className="w-1/2 mr-2">
                                    <DatePicker
                                        format={'HH:mm:ss'}
                                        picker='time'
                                        placeholder='Select time' className="w-full bg-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-4" />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <DatePicker
                                        placeholder='Select date'
                                        format={'DD/MM/YYYY'}
                                        className="w-full bg-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-4" />
                                </div>

                            </div>
                            <div className="w-full flex justify-center sm:justify-start">

                                {/* <Button size='large' type="primary" className='button-primary mt-2'>Appointment Submit</Button> */}
                                <button className="button-36 mt-2" role="button">Appointment Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
