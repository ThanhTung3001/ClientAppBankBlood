import React, { useEffect, useState } from 'react';
import { MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';
import SelectCustom from '../../components/SelectCustom';
import Select from 'react-select'
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { BASE_URL } from '../../BaseUrl';
import { useSelector } from 'react-redux';
import { GetWithToken } from '../../app/api/apiMethod';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function uploadAdapter(loader, AppToken) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then((file) => {
                    body.append("image", file);
                    // let headers = new Headers();
                    // headers.append("Origin", "http://localhost:3000");
                    fetch(`${BASE_URL}/api/Upload/Images`, {
                        method: "post",
                        headers: {
                            'Authorization': AppToken,
                        },
                        body: body
                        // mode: "no-cors"
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            resolve({
                                default: `${BASE_URL}/${res.data.path}`
                            });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            });
        }
    };
}

const fileTypes = ["JPG", "PNG", "GIF"];
export const EventUpdate = ({ open, data, handleClose, handlerConfirm }) => {
    const InsertSchema = Yup.object().shape({
        title: Yup.string().required('Name is required').min(5, 'Too short').max(200, 'too long'),
        description: Yup.string().required('Description is required').min(10, 'Too short').max(2000, 'too long'),
        startTime: Yup.date()
            .required('Public time is required')
            .min(new Date(), 'Public time must be after or equal to today'),
        finishTime: Yup.date()
            .required('Public time is required')
            .min(new Date(60*60*24), 'Public time must be after or equal to today')

        // phoneNumber: Yup.number().required('Capacity is required')
    });
    const AppToken = useSelector(state => state.SignUp.token);
    const [file, setFile] = useState(null);
    const [fileStore, setFileStore] = useState({});
    const [categories, setCategories] = useState([]);
    const [tagSelected, setTagSelected] = useState(null);
    const [categorySelected, setCategorySelected] = useState(null);
    const [tags, setTags] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [publicTimer, setPublicTimer] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader, AppToken);
        };
    }
    useEffect(() => {
      
    }, []);
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
                                    title: data.title,
                                    description: data.description,
                                    startTime: moment(new Date(data.startTime)).format("YYYY-MM-DD"),
                                    finishTime:  moment(new Date(data.finishTime)).format("YYYY-MM-DD")

                                }
                            }
                            validationSchema={InsertSchema}
                            onSubmit={(values) => {

                               
                               

                                handlerConfirm(values, file);

                            }}
                        >
                            {
                                ({ errors, touched }) => (
                                    <Form className='h-full w-[60%]'>
                                        <div className="relative my-6 mx-auto h-full w-full">

                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t border-b-1 border-gray">
                                                    <h3 className="text-3xl font-semibold text-black">
                                                        Event Create
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
                                                <div className="relative p-6 flex-auto h-full overflow-y-scroll">
                                                    <div className="flex flex-row justify-center">

                                                        <div className="label w-full">
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Title
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="title"
                                                                        // value={data.name}
                                                                        placeholder='Enter title'
                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.title && touched.title ? (<span className='text-danger'>{errors.title}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Description
                                                                </label>
                                                                <div className="relative">
                                                                    <Field
                                                                        name="description"
                                                                        type="text"
                                                                        as="textarea"

                                                                        // value={data.capacity}
                                                                        placeholder='category'

                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.description && touched.description ? (<span className='text-danger'>{errors.description}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Upload
                                                                </label>
                                                                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

                                                            </div>

                                                            <div >
                                                                <div>
                                                                    <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                        Start Time
                                                                    </label>
                                                                    <div className="relative">
                                                                        <Field
                                                                            name="startTime"
                                                                            type="date"
                                                                            // as="date"
                                                                            // value={data.capacity}
                                                                            placeholder='Public Time'

                                                                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                        />
                                                                        <div>
                                                                            {
                                                                                errors.startTime && touched.startTime ? (<span className='text-danger'>{errors.startTime}</span>) : (null)
                                                                            }
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                                <div>
                                                                    <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                        Finish Time
                                                                    </label>
                                                                    <div className="relative">
                                                                        <Field
                                                                            name="finishTime"
                                                                            type="date"
                                                                            // as="date"

                                                                            // value={data.capacity}
                                                                            placeholder='Public Time'

                                                                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                        />
                                                                        <div>
                                                                            {
                                                                                errors.finishTime && touched.finishTime ? (<span className='text-danger'>{errors.finishTime}</span>) : (null)
                                                                            }
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                                <div>
                                                                    <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                        List user subcribe
                                                                    </label>
                                                                    <div className="relative">
                                                                                <Select
                                                                                options={data.eventUserSubs.map((e,index)=>{
                                                                                    return {
                                                                                        label:e?.userInfo?.fullName +" - "+e?.userInfo?.email,
                                                                                        value:e.id
                                                                                    }
                                                                                })}
                                                                                value={data.eventUserSubs.map((e,index)=>{
                                                                                    return {
                                                                                        label:e?.userInfo?.fullName +" - "+(e?.userInfo?.email)??"",
                                                                                        value:e.id
                                                                                    }
                                                                                })}
                                                                                isDisabled
                                                                                isMulti
                                                                                />
                                                                    </div>

                                                                </div>
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
                                                    // onClick={() => { alert('submit') }}
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
    )
}
