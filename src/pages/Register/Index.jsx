import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb';
import { Table, Input, Pagination, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";
import { deleteRegistration, fetchRegistration, insertRegistration, updateRegistration } from './Reducer/registerReducer';
import RegisterInsert from './RegisterInsert';
import RegisterUpdate from './RegisterUpdate';
import RegisterDelete from './RegisterDelete';

export default function RegisterBloodBank() {
    const totalPage = useSelector(state => state.Register.totalPage);
    const data = useSelector(state => state.Register.data);
    const page = useSelector(state => state.Register.page);
    const appToken = useSelector(state => state.SignUp.token);
    const loading = useSelector(state => state.Register.loading);
    const userCurrentData = useSelector(state => state.SignUp.userResponse)
    //Modal
    const [modalView, setModalView] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);
    //ValueSelected
    const [valueSelected, setValueSelected] = useState({});
    const [keyword,setKeyword]=useState('');
    //Handler
    const SeletedHandler = (value) => {
        //  console.log(value);
        setValueSelected(value);
    }
    const HandleOpenViewModal = (data) => {
        SeletedHandler(data);
        setModalView(true);
    }
    const HandleOpenEditModal = (data) => {
        SeletedHandler(data);
        setModalEdit(true);
        // console.log('tapp');
    }
    const handleOpenDeleteModal = (data) => {
        SeletedHandler(data);
        setModalDelete(true);
    }

    const handlerConfirmEdit = (data) => {
        var now = new Date();
        data.id = valueSelected.id;
        data.updateBy = userCurrentData.data.userName;
        data.updateTime = now.toISOString();
        // console.log(appToken);
        dispatch(updateRegistration({
            data: data,
            token: appToken
        }));
        dispatch(fetchRegistration({
            page: page,
            pageSize: 20,
            token: appToken
        }))
        setTimeout(()=>{
            dispatch(fetchRegistration({
                page: page,
                pageSize: 10,
                token: appToken
            }))
           },3000);
           setModalEdit(false)

    }
    const handleConfirmDelete = (data) => {
        dispatch(deleteRegistration({
            data: data,
            token: appToken
        }));

        setModalDelete(false)
    }
    const handlerInsert = (data) => {

        var now = new Date();
        data.id = 0;
        data.updateBy = userCurrentData.data.userName;
        data.updateTime = now.toISOString();
        data.createBy = userCurrentData.data.userName;
        data.createUTC = now.toISOString();
        //  data.urgent = false;

        // console.log(appToken);
        dispatch(insertRegistration({
            data: data,
            token: appToken
        }));
        // dispatch(fetchRegistration({
        //     page: page,
        //     pageSize: 20,
        //     token: appToken
        // }))
        setModalInsert(false);
        setTimeout(()=>{
            dispatch(fetchRegistration({
                page: page,
                pageSize: 10,
                token: appToken
            }))
           },3000)

    }


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRegistration({
            page: page,
            pageSize: 10,
            token: appToken,
            search:keyword
        }))
    }, [keyword]);
    const handleChangePage = ({ pageChange }) => {
        dispatch(fetchRegistration({
            page: pageChange,
            pageSize: 10,
            token: appToken,
            search:keyword
        }))
    }
    const handleChangeInput=(e)=>{
        var textSearch =  e.target.value;
        console.log(textSearch);
        setKeyword(textSearch); 
}
    const StatusView = ({ status }) => {
        switch (status) {
            case 1:

                return <>
                    <div className="p-3 bg-body rounded-md max-w-40"><p className='text-white text-center font-bold'>Just Resgister</p></div>
                </>;
            case 2:
                return <>
                    <div className="p-3 bg-warning rounded-md  max-w-40"><p className='text-white text-center font-bold'>Accept Register</p></div>
                </>;
            case 3:
                return <>
                    <div className="p-3 bg-meta-5 rounded-md  max-w-40"><p className='text-white text-center font-bold'>Processing</p></div>
                </>;
            case 4:
                return <>
                    <div className="p-3 bg-success rounded-md  max-w-40"><p className='text-white text-center font-bold'>Finish</p></div>
                </>;
            case 5:
                return <>
                    <div className="p-3 bg-danger rounded-md  max-w-40"><p className='text-white  text-center font-bold'>Reject</p></div>
                </>;
            default:
                return <>
                    <div className="p-3 bg-body rounded-md  max-w-40"><p className='text-white text-center font-bold'>Just Resgister</p></div>
                </>;
        }
    }
    return (

        <DefaultLayout>
            <Breadcrumb pageName='Register Donate' />
            <>
                <div className='w-full max-w-full rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className="flex flex-row justify-between">
                    <div className="search-block min-w-75">
                        <input type="text"
                         value={keyword}
                         placeholder='Search'
                         onChange={handleChangeInput}
                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' />
                    </div>
                        <div onClick={() => setModalInsert(true)} className="flex w-[50px] justify-center rounded bg-primary m-3 mr-4 mb-0 p-3 font-medium text-gray">
                            <AiFillPlusSquare size={16} />
                        </div>
                    </div>
                    <Table celled loading={loading.toString()} className='mb-0'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    {""}
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Bloodgroup
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Hospital
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Capacity (ml)
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    User Info
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Status
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Handler
                                </Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item, index) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{index + ((page - 1) * 10) + 1}</Table.Cell>
                                    <Table.Cell>{item.bloodGroup?.name}</Table.Cell>
                                    <Table.Cell>{item.hospital?.name}</Table.Cell>
                                    <Table.Cell>{item.capacity}</Table.Cell>
                                    <Table.Cell>{`${item.userInfo?.fullName} - ${item.userInfo.iccid}`}</Table.Cell>
                                    <Table.Cell>{<StatusView status={item.status} />}</Table.Cell>
                                    <Table.Cell width={'1'}>
                                        <div className="flex justify-around">
                                           <AiFillEdit color='#3b7dd8' className='hover: cursor-pointer ' onClick={() => HandleOpenEditModal(item)} />
                                            <AiFillDelete color='#cc2a36' className='hover: cursor-pointer ' onClick={() => handleOpenDeleteModal(item)} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <div className="flex flex-row justify-end p-2">
                        <Pagination
                            activePage={page}
                            totalPages={totalPage}
                            onPageChange={(_, { activePage }) => handleChangePage({ pageChange: activePage })}
                            size="mini"
                            siblingRange={1}
                            firstItem={null}
                            lastItem={null}
                            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                            prevItem={{ content: <Icon name="angle left" />, icon: true }}
                            nextItem={{ content: <Icon name="angle right" />, icon: true }}
                        />
                    </div>
                </div>
                {/* <BloodGroupEdit open={modalEdit} data={valueSelected} handlerConfirm={handlerConfirmEdit} handleClose={() => setModalEdit(false)} />
                <BloodGroupInsert open={modalInsert} handlerConfirm={handlerInsertBloodGroup} handleClose={() => setModalInsert(false)} />
                <BloodGroupDelete open={modalDelete} handlerConfirm={handleConfirmDeleteBloodGroup} handleClose={() => setModalDelete(false)} data={valueSelected} /> */}
                <RegisterInsert open={modalInsert} handlerConfirm={handlerInsert} handleClose={() => setModalInsert(false)} />
                {
                    modalEdit && <RegisterUpdate open={modalEdit} data={valueSelected} handlerConfirm={handlerConfirmEdit} handleClose={() => setModalEdit(false)} />
                }
                <RegisterDelete open={modalDelete} data={valueSelected} handlerConfirm={handleConfirmDelete} handleClose={() => setModalDelete(false)} />
            </>
        </DefaultLayout>
    )
}
