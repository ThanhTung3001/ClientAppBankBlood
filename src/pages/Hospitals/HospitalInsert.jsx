import React, { useEffect, useState } from 'react';
import { MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';
import SelectCustom from '../../components/SelectCustom';
import Select from 'react-select'
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = ({ text }) => <div className="marker">{<MdLocationOn color='#DC4C64' size={32} />}</div>;
export const HospitalInsert = ({ open, data, handleClose, handlerConfirm }) => {
    const InsertSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(5, 'Too short').max(50, 'too long'),
        address: Yup.string().required('Address is required').min(6, 'Too short').max(50, 'too long'),
        phoneNumber: Yup.string().required('Capacity is required')
    });
    const [dataFetch, setDataFetch] = useState([]);
    const [selectedDistrist, setSelectedDistrist] = useState({});
    const [selectedWard, setSelectedWard] = useState({});
    const [distrists, setDistrists] = useState([]);
    const [wards, setWards] = useState([]);


    const [marker, setMarker] = useState({
        lat: 16.368563,
        lng: 107.2735872
    });
    const defaultProps = {
        center: {
            lat: 16.368563,
            lng: 107.2735872
        },
        zoom: 11
    };
    const handleMapClick = (event) => {
        const lat = event.lat;
        const lng = event.lng;

        // Update the component's state with the selected location
        setMarker({ lat, lng });
    };

    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/p/46?depth=3')
            .then(rs => {
                var { data } = rs;
                setDataFetch(data);
                setDistrists(data.districts.map((e, index) => {
                    return {
                        label: e.name,
                        value: e.code
                    }
                }));
            })
    }, [])
    const handleChangeDistrists = (event) => {
        var selectedDistrist = dataFetch.districts.filter((e, index) => {
            return e.code === event.value
        });
        setSelectedDistrist(event.label);
        // selectedDistrist = selectedDistrist.lenght > 0 ? selectedDistrist[0] : null;
        if (selectedDistrist[0] !== null) {
            // console.log(selectedDistrist[0].wards);
            setWards(
                selectedDistrist[0].wards.map((e, index) => {
                    return {
                        label: e.name,
                        value: e.code
                    }
                })
            )
        }

    }

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
                                    name: '',
                                    address: '',
                                    phoneNumber: ''
                                }
                            }
                            validationSchema={InsertSchema}
                            onSubmit={(values) => {

                                values = {
                                    ...values,
                                    address: values.address + ", " + selectedWard + ", " + selectedDistrist,
                                    lat: marker.lat,
                                    long: marker.lng
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
                                                                    Name
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="name"
                                                                        // value={data.name}
                                                                        placeholder='Enter hospital'
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
                                                                    Phone Number
                                                                </label>
                                                                <div className='relative'>
                                                                    <Field
                                                                        name="phoneNumber"
                                                                        type="text"
                                                                        // value={data.capacity}
                                                                        placeholder='PhoneNumber'

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
                                                            {/* <div >
                                                                <label className='mb-2 mt-4 block font-medium text-black dark:text-white'>
                                                                    PickMap
                                                                </label>
                                                                <div style={{ height: '300px', width: '100%', borderRadius: 16 }}>
                                                                    <GoogleMapReact

                                                                        bootstrapURLKeys={{ key: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8" }}
                                                                        defaultCenter={defaultProps.center}
                                                                        defaultZoom={defaultProps.zoom}
                                                                        // onChildClick={()}
                                                                        onClick={handleMapClick}>
                                                                        {marker && (
                                                                            <Marker
                                                                                lat={marker.lat}
                                                                                lng={marker.lng}
                                                                                text="Marker"
                                                                            />
                                                                        )}
                                                                    </GoogleMapReact>
                                                                </div>
                                                            </div> */}

                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Districts
                                                                </label>
                                                                <div className="relative">
                                                                    <Select options={distrists} onChange={handleChangeDistrists} required />

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Wards
                                                                </label>
                                                                <div className="relative">
                                                                    <Select options={wards} required onChange={(e) => { setSelectedWard(e.label) }} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className='mb-1 mt-3 block font-medium text-black dark:text-white'>
                                                                    Addresss
                                                                </label>
                                                                <div className="relative">
                                                                    <Field
                                                                        name="address"
                                                                        type="text"
                                                                        as="textarea"

                                                                        // value={data.capacity}
                                                                        placeholder='Address'

                                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    />
                                                                    <div>
                                                                        {
                                                                            errors.address && touched.address ? (<span className='text-danger'>{errors.address}</span>) : (null)
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div >
                                                                    <label className='mb-2 mt-4 block font-medium text-black dark:text-white'>
                                                                        Pick position as map
                                                                    </label>
                                                                    <div style={{ height: '300px', width: '100%', borderRadius: 16 }}>
                                                                        <GoogleMapReact

                                                                            bootstrapURLKeys={{ key: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8" }}
                                                                            defaultCenter={defaultProps.center}
                                                                            defaultZoom={defaultProps.zoom}
                                                                            // onChildClick={()}
                                                                            onClick={handleMapClick}>
                                                                            {marker && (
                                                                                <Marker
                                                                                    lat={marker.lat}
                                                                                    lng={marker.lng}
                                                                                    text="Marker"
                                                                                />
                                                                            )}
                                                                        </GoogleMapReact>
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
