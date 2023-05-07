import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function BloodGroupEdit({ open, data, handleClose,handlerConfirm }) {

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').max(20, 'too long'),
        description: Yup.string().required('Description is required').min(10, 'Too short').max(50, 'too long'),
        capacity: Yup.number().required('Capacity is required')
    });
    return (
        <>
            {
                open ? (
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none bg-black bg-opacity-50"
                    >
                        <Formik
                            initialValues={
                                {
                                    name: data.name,
                                    description: data.description,
                                    capacity: data.capacity
                                }
                            }
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                handlerConfirm(values);
                            }}
                        >
                            {
                                ({ errors, touched }) => (
                                    <Form className='w-full'>
                                        <div className="relative my-6 mx-auto max-w-3xl min-w-[600px]">

                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t border-b-1 border-gray">
                                                    <h3 className="text-3xl font-semibold text-black">
                                                        BloodGroup Details
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text- bg-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-6 flex-auto">
                                                    <div className="flex flex-row justify-center">

                                                        <div className="label w-full">
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Name
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="name"
                                                                        // value={data.name}
                                                                        placeholder='Enter blood group name'
                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.name && touched.name ? (<span className='text-danger'>{errors.name}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div >
                                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                                    Description
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="description"
                                                                        as="textarea"
                                                                        // value={data.description}
                                                                        placeholder='Enter description'
                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.description && touched.description ? (<span className='text-danger'>{errors.description}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div >
                                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                                    Capacity (ml)
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="capacity"
                                                                        type="number"
                                                                        // value={data.capacity}
                                                                        placeholder='Empty'

                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.capacity && touched.capacity ? (<span className='text-danger'>{errors.capacity}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div >

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid  border-gray rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => handleClose()}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="submit"


                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }

                        </Formik>
                    </div>
                ) : null
            }
        </>
    );
}
