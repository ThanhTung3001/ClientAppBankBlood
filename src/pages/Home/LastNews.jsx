import React, { useEffect } from 'react';
import { AiOutlineArrowRight, AiFillCalendar } from "react-icons/ai";
import { BsMapFill } from "react-icons/bs";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../../BaseUrl';
import { fetchBlog } from '../Blog/Reducer/blogReducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../../components/Image/ImageWithFallback';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
export const LastNews = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.Blog.data);
    const navigate = useNavigate();
    useEffect(() => {

        dispatch(fetchBlog({
            page: 1,
            pageSize: 20,
            token: TOKEN
        }))
    }, []);
    const handlerSeeMore = () => {
        navigate('/blogs')
    }
    const handleClickBlog = (id)=>{
        navigate(`/blogs/${id}`)
    }


    return (
        <div id='our-camping'>
            <div className="container ">
                <div className="camping-header flex justify-between items-center">
                    <h3 className='text-4xl '>Latest news</h3>
                    <div className="see-all">
                        <p className="text-xl flex items-center hover:text-green-500" onClick={handlerSeeMore} >See all <AiOutlineArrowRight className='ml-2' /></p>
                    </div>
                </div>
                <div className="camping-description w-full sm:w-1/2 mt-4">
                    <p className='text-gray-600 text-md'>Encourage new donors toblood. We have total donor centers and visit
                        thousands of other venues on various occasions..</p>
                </div>
                <div className="camping-caroul">
                    <Carousel autoPlay centerMode responsive={responsive} className=''>
                        {
                            (data.map((e) =>

                            (<div key={e.id}
                                onClick={()=>handleClickBlog(e.id)}
                                className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden m-8 cursor-pointer hover:shadow-4 hover:scale-105 transition-all duration-700 ">
                                <div className="md:flex flex-col">
                                    <div className="md:flex-shrink-0">
                                        <ImageWithFallback className="h-60 w-full object-cover card-image" src={`${BASE_URL}${e.avatar}`} alt="Card image" />
                                    </div>
                                    <div className="p-4">
                                        <div className="date flex items-center mb-3">
                                            <AiFillCalendar color='#2db853' />
                                            <p className='text-gray-500 ml-2 text-base text-[gray] timer '>{moment(new Date(e.publicTime)).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="uppercase tracking-wide text-xl text-black font-semibold title-base">{e.title}</div>
                                        <p className="mt-2 text-gray-500 description-base">{e.description}</p>

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
