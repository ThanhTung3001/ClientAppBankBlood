import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb';
import { Table, Input, Pagination, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
// import { changePage, deleteBloodGroup, fetchBloodGroup, insertBloodGroup, updateBoodGroup } from './Reducer/BlogReducer';
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";
import { deleteBlog, fetchBlog, insertBlog, updateBlog } from './Reducer/blogReducer';
// import { BlogEdit } from './BlogEdit';
import { BlogInsert } from './BlogInsert';
// import {BlogDelete} from './BlogDelete';
import { PostFileWithToken } from '../../app/api/apiMethod';
import { toast } from 'react-toastify';
import moment from 'moment';
import { BlogUpdate } from './BlogUpdate';
import { BlogDelete } from './BlogDelete';

export default function Blog() {
    const totalPage = useSelector(state => state.Blog.totalPage);
    const data = useSelector(state => state.Blog.data);
    const page = useSelector(state => state.Blog.page);
    const appToken = useSelector(state => state.SignUp.token);
    const loading = useSelector(state => state.Blog.loading);
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
                        dispatch(updateBlog({
                            data: data,
                            token: appToken
                        }));
                        setModalInsert(false);
                    } else {
                        toast.error('Update Blog Fail')
                    }
                })
        } else {
            dispatch(updateBlog({
                data: data,
                token: appToken
            }));
            setModalEdit(false);
        }

        setTimeout(()=>{
            dispatch(fetchBlog({
                page: page,
                pageSize: 20,
                token: appToken
            }))
           },3000)
    }
    const handleConfirmDelete = (data) => {
        dispatch(deleteBlog({
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
                        dispatch(insertBlog({
                            data: data,
                            token: appToken
                        }));
                        setModalInsert(false);
                    } else {
                        toast.error('Insert Blog Fail')
                    }
                })
        } else {
            dispatch(insertBlog({
                data: data,
                token: appToken
            }));
            setModalInsert(false);
        }
       setTimeout(()=>{
        dispatch(fetchBlog({
            page: page,
            pageSize: 20,
            token: appToken
        }))
       },3000)
        // console.log(appToken);

    }

    useEffect(() => {

        dispatch(fetchBlog({
            page: page,
            pageSize: 20,
            token: appToken
        }))
    }, []);
    const handleChangePage = ({ pageChange }) => {
        dispatch(changePage(pageChange))
    }
    return (

        <DefaultLayout>
            <Breadcrumb pageName='Blog' />
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
                                    Category
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    View Count
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Public Time
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
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell>{item.category?.name}</Table.Cell>
                                    <Table.Cell>{item.viewCount}</Table.Cell>
                                    <Table.Cell>{moment(new Date(item.publicTime)).format('DD/MM/YYYY')}</Table.Cell>
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
                            onPageChange={(_, { activePage }) => handleChangePage(activePage)}
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


                <BlogInsert open={modalInsert} handlerConfirm={handlerInsert} handleClose={() => setModalInsert(false)} />
                <BlogDelete open={modalDelete} data={valueSelected} handlerConfirm={handleConfirmDelete} handleClose={() => setModalDelete(false)} />
                {
                    modalEdit && <BlogUpdate open={modalEdit} data={valueSelected} handlerConfirm={handlerConfirmEdit} handleClose={() => setModalEdit(false)} />
                }
            </>
        </DefaultLayout>
    )
}
