import React, { useEffect, useMemo, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';
import TableOne from '../../components/TableOne';
import BrandOne from '../../images/brand/brand-01.svg'
import BrandTwo from '../../images/brand/brand-02.svg'
import BrandThree from '../../images/brand/brand-03.svg'
import BrandFour from '../../images/brand/brand-04.svg'
import BrandFive from '../../images/brand/brand-05.svg'

import { useTable, useSortBy, usePagination } from 'react-table';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { GetWithToken, PostWithToken } from '../../app/api/apiMethod';
import { BASE_URL } from '../../BaseUrl';
import { toast } from 'react-toastify';
import { FetchUserAsync } from './userSlice';
import Select from 'react-select'

export const UserManagement = () => {
    // const [error,setError] = useState('');
    const data = useSelector(state => state.UserReducer.users);
    const Apptoken = useSelector(state => state.SignUp.token);
    const auth = useSelector(state => state.SignUp.token);
    // const [pageIndex,setPageIndex] = useState(1);
    // const [totalPage,setTotalPage] = useState(0);
    const dispatch = useDispatch();
    const pageper = 20;
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataModalEdit, setDataModalEdit] = useState({});
    
    const handleUpdate = (data)=>{

    }

    const handlerOpenView = (data) => {
        setDataModal(data);
        setShowModal(!showModal);
    }
    const handlerOpenEdit = (data) => {
        setShowModalEdit(!showModalEdit);
        setDataModalEdit(data);
    }
    useEffect(() => {
        console.log("User:", Apptoken);
        dispatch(FetchUserAsync(Apptoken));
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Users' />

            {/* <!-- ====== Calendar Section Start ====== --> */}
            <div className='w-full max-w-full rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Index</Table.HeaderCell>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Handler</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            (data.map((e, index) => {
                                return (
                                    <Table.Row key={e.userName}>
                                        <Table.Cell>
                                            {index+1}
                                        </Table.Cell>
                                        <Table.Cell>{e.userName}</Table.Cell>
                                        <Table.Cell>{e.email}</Table.Cell>
                                        <Table.Cell>{e.roles.join(", ")}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex justify-around">
                                                <AiFillEye color='#7bc043' className='hover: cursor-pointer' onClick={() => handlerOpenView(e)} />
                                                <AiFillEdit color='#3b7dd8' className='hover: cursor-pointer ' onClick={() => handlerOpenEdit(e)} />
                                                <AiFillDelete color='#cc2a36' className='hover: cursor-pointer ' />

                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }))
                        }

                    </Table.Body>

                    {/* <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer> */}
                </Table>

            </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative my-6 mx-auto max-w-3xl min-w-[600px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-black">
                                        User Details
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
                                    <div className="flex flex-row">
                                        <div className="label w-2/3">
                                            <div className="title text-black mt-3 text-lg">
                                                Full Name : {`${dataModal.firstName} ${dataModal.lastName}`}
                                            </div>
                                            <div className="title text-black mt-3 text-lg">
                                                Username : {dataModal.userName}
                                            </div>
                                            <div className="title text-black mt-3 text-lg">
                                                Email : {dataModal.email}
                                            </div>
                                            <div className="title text-black mt-3 text-lg">
                                                Role : {dataModal.roles.join(', ')}
                                            </div>
                                        </div>
                                        <div className="info flex justify-center w-1/3 flex-col items-center">
                                            <img src={dataModal.avatar} className='rounded-full border-gray h-12 w-12' alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {showModalEdit ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none "
                    >
                        <div className="relative my-6 mx-auto max-w-3xl min-w-[600px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-black">
                                        User Details
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
                                                    FullName
                                                </label>
                                                <div className='relative'>
                                                    <input
                                                        disabled
                                                        value={`${dataModalEdit.firstName} ${dataModalEdit.lastName}`}
                                                        placeholder='Enter your first name'
                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    />
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                    UserName
                                                </label>
                                                <div className='relative'>
                                                    <input
                                                        disabled
                                                        value={`${dataModalEdit.userName}`}
                                                        placeholder='Enter your first name'
                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    />
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                    Email
                                                </label>
                                                <div className='relative'>
                                                    <input
                                                        disabled
                                                        value={`${dataModalEdit.email}`}
                                                        placeholder='Enter your first name'
                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    />
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                    Phone Number
                                                </label>
                                                <div className='relative'>
                                                    <input
                                                        disabled
                                                        value={`${dataModalEdit.phoneNumber ?? ""}`}
                                                        placeholder='Empty'
                                                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    />
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                    Roles
                                                </label>
                                                <div className='relative'>
                                                    <Select
                                                        className='border-stroke'
                                                        isMulti
                                                        closeMenuOnSelect={false}
                                                        options={["SuperAdmin",
                                                            "Admin",
                                                            "Moderator",
                                                            "Basic"].map((e, index) => {
                                                                return {
                                                                    value: e,
                                                                    label: e
                                                                }
                                                            })}
                                                        defaultValue={(dataModalEdit.roles.map((e, index) => {
                                                            return {
                                                                value: e,
                                                                label: e
                                                            }
                                                        }))} />
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModalEdit(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleUpdate}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </DefaultLayout>
    )
}

