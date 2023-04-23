import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiFillCalendar } from "react-icons/ai";
import { BsMapFill } from "react-icons/bs";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, TOKEN } from '../../BaseUrl';
import ImageWithFallback from '../../components/Image/ImageWithFallback';
import moment from 'moment';
import { fetchEvent, registerEvent } from '../Event/Reducer/EventReducer';
import { Button } from 'semantic-ui-react';
// import { Carousel } from '../../components/Carousel';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3.5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1
    }
};
export const OurCamping = () => {
    const [blog, setBlog] = useState({});
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
        if(!userInfor.data) return;
        console.log(userInfor.data.id);
        var listId = data.filter(e => {
            // console.log(e.userInfoId);
            return userInfor.data.id == e.userInfoId;
        });
        console.log(listId);
        return listId.length == 1;
    }
    return (
        <div id='our-camping'>
            <div className="container ">
                <div className="camping-header flex justify-between items-center">
                    <h3 className='text-4xl text-center sm:text-left w-full '> Our campaings</h3>
                    <div className="see-all" onClick={()=>navigate('/campaing')}>
                        <p className=" hidden text-xl sm:flex items-center hover:text-green-500 sm:w-[100px]">See all <AiOutlineArrowRight className='ml-2' /></p>
                    </div>
                </div>
                <div className="camping-description w-full sm:w-1/2 mt-4">
                    <p className='text-gray-600 text-md'>Encourage new donors toblood. We have total donor centers and visit
                        thousands of other venues on various occasions.</p>
                </div>
                <div className="camping-caroul">
                    <Carousel autoPlay infinite responsive={responsive} className=''>
                        {
                            (data.map((e, index) => (
                                <div key={e.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden m-8">
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
                        }



                    </Carousel>

                </div>
            </div>
        </div>
    )
}
