import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { GetWithToken } from '../../app/api/apiMethod';
import { BASE_URL } from '../../BaseUrl';
import Select from 'react-select';
import moment from 'moment';


const options = [
    {
        label: 'Register',
        value: 1
    }, {
        label: 'Accept',
        value: 2
    },
    {
        label: 'Processing',
        value: 3
    },
    {
        label: 'Finish',
        value: 4
    },
    {
        label: 'Rejected',
        value: 5
    },
]

export default function RegisterInsert({ open, handleClose, handlerConfirm }) {

    const AppToken = useSelector(state => state.SignUp.token);
    //Selected
    const [bloodGroupsSelected, setBloogGroupsSelected] = useState(1);
    const [hospitalsSelected, setHospitalsSelected] = useState(1);
    const [userInfoSelected, setUserInfoSelected] = useState(1);
    const [status, setStatus] = useState(1);

    //List data
    const [bloodGroups, setBloogGroups] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        GetWithToken({ url: `/api/BloodGroup`, token: AppToken })
            .then((rs => setBloogGroups(
                (rs.data.data).map((e, index) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            )));
        GetWithToken({ url: `/api/Hospital`, token: AppToken })
            .then((rs => setHospitals(
                (rs.data.data).map((e, index) => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            )));
        GetWithToken({ url: `/api/UserInfo`, token: AppToken })
            .then((rs => setUserInfo(
                (rs.data.data).map((e, index) => {
                    return {
                        label: e.fullName + " - " + ` ${e.iccid} `,
                        value: e.id
                    }
                })
            )));
    }, [])

    const nextDate = new Date(Date.now() + (86400000 * 2));


    const InsertSchema = Yup.object().shape({
        capacity: Yup.number().required('Capacity is required').min(50,"Capacity not smaller 50ml"),
        registerTime: Yup.date().required('Date register Required').min(nextDate, "The blood donation schedule must be held after today"),
        // status: Yup.number().required('Status is requerid').min(1, 'Must include: Register, Accept, Processing, Finish').max(4, 'Must include: Register, Accept, Processing, Finish')
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
                                    capacity: '',
                                    registerTime: moment(nextDate, "YYYY-MM-DDTHH:mm:ss").format('YYYY-MM-DD'),

                                }
                            }
                            validationSchema={InsertSchema}
                            onSubmit={(values) => {

                                values = {
                                    ...values,
                                    hospitalId: hospitalsSelected,
                                    bloodGroupId: bloodGroupsSelected,
                                    userId: userInfoSelected,
                                    status: status.value
                                }
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
                                                        BloodGroup Insert
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
                                                                    BloodGroup
                                                                </label>
                                                                <div className='relative'>
                                                                    <Select options={bloodGroups} required onChange={(e) => { setBloogGroupsSelected(e.value) }} />
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Hospital
                                                                </label>
                                                                <div className='relative'>
                                                                    <Select options={hospitals} required onChange={(e) => { setHospitalsSelected(e.value) }} />
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    User
                                                                </label>
                                                                <div className='relative'>
                                                                    <Select options={userInfo} required onChange={(e) => setUserInfoSelected(e.value)} />
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
                                                                        placeholder='Campacity'

                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-5 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
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
                                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                                    RegistrationTime
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="registerTime"
                                                                        type="date"
                                                                        // value={data.capacity}
                                                                        placeholder='RegistrationTime'

                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-5 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.registerTime && touched.registerTime ? (<span className='text-danger'>{errors.registerTime}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Status
                                                                </label>
                                                                <div className='relative'>

                                                                    <Select
                                                                        required
                                                                        options={options}
                                                                        onChange={(e) => {
                                                                            setStatus(e)
                                                                        }}

                                                                    // value={status}
                                                                    />
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
                                                        Save
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
