import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowRight, AiFillCalendar } from "react-icons/ai";
import { BsMapFill } from "react-icons/bs";
import './campaing.scss';
import Pagination from '../../components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvent } from '../Event/Reducer/EventReducer';
import { BASE_URL, TOKEN } from '../../BaseUrl';
import ImageWithFallback from '../../components/Image/ImageWithFallback';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

export const Campaing = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.Event.data);
    const navigate = useNavigate();
    const userInfor = useSelector(state => state.SignUp.userResponse);
    const appToken = useSelector(state => state.SignUp.token);
    useEffect(() => {

        dispatch(fetchEvent({
            page: 1,
            pageSize: 12,
            token: TOKEN
        }))
        document.title = "BankBlood - Campaing";
    }, []);
    const handlerSeeMore = () => {
        navigate('/campings')
    }
    const handleClickBlog = (id) => {
        navigate(`/campings/${id}`)
    }
    const handleSubcribe = (id) => {

        if (appToken == null) {
            navigate('/auth/signup')
        } else {
            //  console.log(appToken);
            dispatch(registerEvent({
                id: id,
                token: appToken
            }));
            setTimeout(() => {

                dispatch(fetchEvent({
                    page: 1,
                    pageSize: 12,
                    token: TOKEN
                }))
            }, 2000)
        }
    }
    const checkSubcribe = (data) => {
        console.log(userInfor.data.id);
        var listId = data.filter(e => {
            // console.log(e.userInfoId);
            return userInfor.data.id == e.userInfoId;
        });
        console.log(listId);
        return listId.length == 1;
    }
    return <div id='camping' className='' >
        <div className="container content mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                (
                    (data.map((e, index) => (
                        <div key={e.id} className="bg-white rounded-xl shadow-md overflow-hidden item-blog cursor-pointer">
                            <div className="md:flex flex-col">
                                <div className="md:flex-shrink-0">
                                    <ImageWithFallback className="h-60 w-full object-cover card-image" src={`${BASE_URL}${e.avatar}`} alt="Card image" />
                                </div>
                                <div className="p-4">
                                    <div className="date flex items-center justify-start mb-2">
                                        <div className="startTime flex justify-center">

                                            <p className='text-black opacity-80 text-sm mr-1'>{moment(new Date(e.startTime)).format("DD/MM/YYYY")} </p>
                                            -
                                            <p className='text-black opacity-80 text-sm ml-1'>{moment(new Date(e.finishTime)).format("DD/MM/YYYY")} </p>
                                        </div>

                                    </div>
                                    <div className="uppercase tracking-wide text-xl text-black font-semibold title-base">{e.title}</div>
                                    <p className="mt-2 text-gray-500 description-base">{e.description}</p>
                                    <div className="location flex items-center mt-2 justify-between">
                                        <div className="location flex items-center">
                                            <BsMapFill className='mr-2 text-[#ffb408]' /> <p>Hue</p>
                                        </div>
                                        {
                                            checkSubcribe(e.eventUserSubs) == true ? <Button disabled >Registered</Button> : <Button primary onClick={() => handleSubcribe(e.id)} >Register</Button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>)))
                )
            }
        </div>
        {/* <div className="flex justify-center">
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </div> */}
    </div>
}
