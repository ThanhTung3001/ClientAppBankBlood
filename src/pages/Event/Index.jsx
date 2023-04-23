import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb';
import { Table, Input, Pagination, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
// import { changePage, deleteBloodGroup, fetchBloodGroup, insertBloodGroup, updateBoodGroup } from './Reducer/EventReducer';
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";
import { deleteEvent, fetchEvent, insertEvent, updateEvent } from './Reducer/EventReducer';
// import { EventEdit } from './EventEdit';
// import { EventInsert } from './EventInsert';
// import {EventDelete} from './EventDelete';
import { PostFileWithToken } from '../../app/api/apiMethod';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EventUpdate } from './EventUpdate';
import { EventDelete } from './EventDelete';
import { EventInsert } from './EventInsert';

export default function Event() {
    const totalPage = useSelector(state => state.Event.totalPage);
    const data = useSelector(state => state.Event.data);
    const page = useSelector(state => state.Event.page);
    const appToken = useSelector(state => state.SignUp.token);
    const loading = useSelector(state => state.Event.loading);
    const userCurrentData = useSelector(state => state.SignUp.userResponse)
    //Modal
    const [modalView, setModalView] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);
    //ValueSelected
    const [valueSelected, setValueSelected] = useState({});
    const dispatch = useDispatch();
    //Handler
    const SeletedHandler = (value) => {
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

    const handlerConfirmEdit = (data, file) => {
        var now = new Date();
        data.id = valueSelected.id;
        data.updateBy = userCurrentData.data.userName;
        data.updateTime = now.toISOString();
        if (file != null) {
            PostFileWithToken({ url: '/api/Upload/Images', token: appToken, file: file })
                .then(rs => {
                    if (rs.status == 200) {
                        var pathFile = rs.data.data.path;
                        data.avatar = pathFile;
                        dispatch(updateEvent({
                            data: data,
                            token: appToken
                        }));
                        setModalInsert(false);
                    } else {
                        toast.error('Update Event Fail')
                    }
                })
        } else {
            data.avatar = valueSelected.avatar;
            dispatch(updateEvent({
                data: data,
                token: appToken
            }));
            
        }
        setModalEdit(false);

        setTimeout(()=>{
            dispatch(fetchEvent({
                page: page,
                pageSize: 20,
                token: appToken
            }))
           },3000)
    }
    const handleConfirmDelete = (data) => {
        dispatch(deleteEvent({
            data: data,
            token: appToken
        }));
        setModalDelete(false);

    }
    const handlerInsert = (data, file) => {

        var now = new Date();
        data.id = 0;
        data.updateBy = userCurrentData.data.userName;
        data.updateTime = now.toISOString();
        data.createBy = userCurrentData.data.userName;
        data.createUTC = now.toISOString();
        if (file != null) {
            PostFileWithToken({ url: '/api/Upload/Images', token: appToken, file: file })
                .then(rs => {
                    if (rs.status == 200) {
                        var pathFile = rs.data.data.path;
                        data.avatar = pathFile;
                        dispatch(insertEvent({
                            data: data,
                            token: appToken
                        }));
                        setModalInsert(false);
                    } else {
                        toast.error('Insert Event Fail')
                    }
                })
        } else {
            dispatch(insertEvent({
                data: data,
                token: appToken
            }));
           
        }
        setModalInsert(false);
       setTimeout(()=>{
        dispatch(fetchEvent({
            page: page,
            pageSize: 20,
            token: appToken
        }))
       },3000)
        // console.log(appToken);

    }

    useEffect(() => {

        dispatch(fetchEvent({
            page: page,
            pageSize: 10,
            token: appToken
        }))
    }, []);
    const handleChangePage = ({ pageChange }) => {
        dispatch(fetchEvent({
            page: pageChange,
            pageSize: 10,
            token: appToken
        }))
    }
    return (

        <DefaultLayout>
            <Breadcrumb pageName='Event' />
            <>
                <div className='w-full max-w-full rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3'>
                    <div className="flex flex-row justify-end">
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
                                    Title
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Description
                                </Table.HeaderCell>

                                <Table.HeaderCell>
                                    Start Time
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                   End Time
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                   User Subcribe
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Handler
                                </Table.HeaderCell>
                                {/* Add other header cells */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item, index) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell><p className='description-base-3'>{item.title}</p></Table.Cell>
                                    <Table.Cell ><p className="description-base-3">{item.description}</p></Table.Cell>
                                    <Table.Cell>{moment(new Date(item.startTime)).format('DD/MM/YYYY HH:mm')}</Table.Cell>
                                    <Table.Cell>{moment(new Date(item.finishTime)).format('DD/MM/YYYY HH:mm')}</Table.Cell>
                                    <Table.Cell>{item.eventUserSubs?.length}</Table.Cell>
                                    <Table.Cell width={'1'}>
                                        <div className="flex justify-around">
                                            <AiFillEye color='#7bc043' className='hover: cursor-pointer' onClick={() => HandleOpenViewModal(item)} />
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
                            onPageChange={(_, { activePage }) => handleChangePage({pageChange:activePage})}
                            size="mini"
                            boundaryRange={0}
                            siblingRange={2}
                            firstItem={null}
                            lastItem={null}
                            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                            prevItem={{ content: <Icon name="angle left" />, icon: true }}
                            nextItem={{ content: <Icon name="angle right" />, icon: true }}
                        />
                    </div>
                </div>


                <EventInsert open={modalInsert} handlerConfirm={handlerInsert} handleClose={() => setModalInsert(false)} />
                <EventDelete open={modalDelete} data={valueSelected} handlerConfirm={handleConfirmDelete} handleClose={() => setModalDelete(false)} />
                {
                    modalEdit && <EventUpdate open={modalEdit} data={valueSelected} handlerConfirm={handlerConfirmEdit} handleClose={() => setModalEdit(false)} />
                }
            </>
        </DefaultLayout>
    )
}
