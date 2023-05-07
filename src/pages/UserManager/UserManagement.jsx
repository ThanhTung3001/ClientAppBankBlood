import React, { useEffect, useMemo, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";
import ReactLoading from 'react-loading';

import { useTable, useSortBy, usePagination } from 'react-table';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { GetWithToken, PostWithToken } from '../../app/api/apiMethod';
import { BASE_URL } from '../../BaseUrl';
import { toast } from 'react-toastify';
import { DeleteUser, FetchUserAsync, UpdateRoleForUser } from './userSlice';
import Select from 'react-select'
import { UserTable } from './UserTable';
import axios from 'axios';



export const UserManagement = () => {
    // const [error,setError] = useState('');
    const data = useSelector(state => state.UserReducer.users);
    const Apptoken = useSelector(state => state.SignUp.token);
    const auth = useSelector(state => state.SignUp.token);
    const userCurrentData = useSelector(state => state.SignUp.userResponse)
    const dispatch = useDispatch();
    const pageper = 20;
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataModalEdit, setDataModalEdit] = useState({});
    const [roleSelected, setRoleSelected] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const status = useSelector(state => state.UserReducer.status);
    const [hospital,setHospital] = useState([]);
    const [hospitalSelected,setHospitalSelected] = useState({});


    const handleUpdate = (data) => {
        console.log(`${BASE_URL}/api/UserInfo/UpdateHospitalId/${hospitalSelected.value}?appUserId=${dataModalEdit.userInfo.id}`);
        axios.put(`${BASE_URL}/api/UserInfo/UpdateHospitalId/${hospitalSelected.value}?appUserId=${dataModalEdit.id}`,null,{headers:{
            'Authorization':localStorage.getItem('Token')
        }}).then(rs=>{
            if(rs.status==200){
               // toast.success('Update Hospital Success');
           
            }
        });
        dispatch(UpdateRoleForUser({
            data: roleSelected.length==0?dataModalEdit.roles:roleSelected,
            token: Apptoken,
            username: dataModalEdit.userName
        }));
       
     
       
        setTimeout(() => {
            dispatch(FetchUserAsync(Apptoken));
        }, 2000);

        setShowModalEdit(!showModalEdit);
    }

    const handlerDelete = () => {
        console.log(dataModalEdit);
        dispatch(DeleteUser({
            username: dataModalEdit.userName,
            token: Apptoken
        },
        ))
        setTimeout(() => {
            dispatch(FetchUserAsync(Apptoken));
        }, 2000)
        setShowModalDelete(!showModalDelete);
    }

    const handlerOpenView = (data) => {
        setDataModal(data);
        setShowModal(!showModal);
    }
    const handlerOpenEdit = (data) => {
        console.log(data);
        setShowModalEdit(!showModalEdit);
        setDataModalEdit(data);
    }
    useEffect(() => {

        dispatch(FetchUserAsync(Apptoken));

         GetWithToken({url:'/api/Hospital',token:""})
         .then(e=>{
          //  console.log(e.data.data);
             setHospital(e.data.data);
         })
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName='Users' />
            {/* <!-- ====== Calendar Section Start ====== --> */}
            {
                status != "loading" ? <>
                    <div className='w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5'>
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
                                                    {index + 1}
                                                </Table.Cell>
                                                <Table.Cell>{e.userName}</Table.Cell>
                                                <Table.Cell>{e.email}</Table.Cell>
                                                <Table.Cell>{e.roles.join(", ")}</Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex justify-around">
                                                        <AiFillEye color='#7bc043' className='hover: cursor-pointer' onClick={() => handlerOpenView(e)} />
                                                        <AiFillEdit color='#3b7dd8' className='hover: cursor-pointer ' onClick={() => handlerOpenEdit(e)} />
                                                        <AiFillDelete color='#cc2a36' className='hover: cursor-pointer ' onClick={() => { setDataModalEdit(e); setShowModalDelete(true) }} />

                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>

                                        )
                                    }))
                                }
                            </Table.Body>
                        </Table>

                    </div>

                    {showModal ? (
                        <>
                            <div
                                className="bg-black bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
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
                                className="bg-black bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none "
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
                                                                onChange={(newValue) => {

                                                                    var roles = newValue.map(e => {
                                                                        return e.label;
                                                                    });
                                                                    setRoleSelected(roles);
                                                                }}
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
                                                    <div >
                                                        <label className='mb-1 mt-4 block font-medium text-black dark:text-white'>
                                                            Hospital
                                                        </label>
                                                        <div className='relative'>
                                                            <Select
                                                                className='border-stroke'
                                                                
                                                                closeMenuOnSelect={true}
                                                               
                                                                options={hospital.map((e, index) => {
                                                                        return {
                                                                            value: e.id,
                                                                            label: e.name
                                                                        }
                                                                    })}
                                                                    onChange={(newValue)=>setHospitalSelected(newValue)}
                                                                defaultValue={{
                                                                    value:dataModalEdit.userInfo?.hospitalId,
                                                                    label:hospital.filter(e=>{
                                                                       // console.log(dataModalEdit.userInfo);
                                                                     var hospitalID=dataModalEdit.userInfo?.hospitalId;
                                                                 
                                                                        return e.id==hospitalID;
                                                                    })[0]?.name
                                                                }} />
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
                                                onClick={() => handleUpdate()}
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

                    {showModalDelete ? (
                        <>
                            <div
                                className="bg-black bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none "
                            >
                                <div className="relative my-6 mx-auto max-w-3xl min-w-[600px]">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold text-black">
                                                Notification
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
                                            <div className="flex flex-row justify-start">

                                                <h2 className='text-black text-xl'>Are you sure remove record?</h2>
                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModalDelete(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 bg-danger text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => handlerDelete()}
                                            >
                                                Yes,sure
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}</> : <>
                    <div className="h-full flex flex-col justify-center">
                        <ReactLoading type='spin' />
                    </div>
                </>
            }


        </DefaultLayout>
    )
}

