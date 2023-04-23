import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowRight, AiFillCalendar } from "react-icons/ai";
import { BsMapFill } from "react-icons/bs";
import './blog.scss';
// import Pagination from '../../components/pagination';
import { GetWithToken } from '../../app/api/apiMethod';
import { BASE_URL, TOKEN } from '../../BaseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Breadcrumb, Icon, Pagination } from 'semantic-ui-react';
import ImageWithFallback from '../../components/Image/ImageWithFallback';

export const BaseBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErorr] = useState(false);
    const { id } = useParams();

    const GetData = (page=1) => {
        GetWithToken(
            {
                url: `/api/Blog?PageNumber=${page}&PageSize=12`,
                token: TOKEN
            }
        ).then(rs => {
            setLoading(false);
            setData(rs.data.data);
            setTotalPage(rs.data.totalPages);
            setCurrentPage(rs.data.pageNumber);
            document.title = "BankBlood - Blogs";
        })
            .catch(error => {
                setErorr(true);
            })
    }
    useEffect(() => {
        GetData();
    }, []);

    const handleChangePage = ({ pageChange }) => {
        setCurrentPage(pageChange);
     
        GetData(pageChange);
    };
    const navigate = useNavigate();
    const handleClickBlog = (id) => {
        navigate(`/blogs/${id}`)
    }

    return <div id='camping' className='h-[100%]' >
        <div className="flex flex-row justify-end mt-30 w-full container">
            <Pagination
                activePage={currentPage}
                totalPages={totalPage}
                onPageChange={(_, { activePage }) => handleChangePage({ pageChange: activePage })}
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
        <div className="container content mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                (
                    (data.map((e, index) => (
                        <div
                            onClick={() => handleClickBlog(e.id)}
                            className="bg-white rounded-xl shadow-md overflow-hidden item-blog cursor-pointer" key={index}>
                            <div className="md:flex flex-col">
                                <div className="md:flex-shrink-0 ">
                                    <ImageWithFallback className="h-40 w-full object-cover" src={`${BASE_URL}${e.avatar}`} alt="Card image" />
                                </div>
                                <div className="p-4">
                                    <div className="date flex items-center mb-3">
                                        <AiFillCalendar color='#2db853' />
                                        <p className='text-gray-500 ml-2 text-base timer'>{moment(new Date(e.publicTime)).format("LLLL")}</p>
                                    </div>
                                    <div className="uppercase tracking-wide text-sm text-black font-semibold title-base">{e.title}</div>
                                    <p className="mt-2 text-gray-500 description truncate overflow-y-clip line-clamp-3">
                                        {e.description}
                                        .</p>

                                </div>
                            </div>
                        </div>
                    ))))
            }
        </div>
        {/* <div className="flex justify-center">
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </div> */}
    </div>
}
