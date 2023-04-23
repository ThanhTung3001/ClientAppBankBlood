import React, { useEffect, useState } from 'react'
import { GetWithToken } from '../../app/api/apiMethod';
import { BASE_URL, TOKEN } from '../../BaseUrl';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import moment from 'moment';
import ShareButton from '../../components/button/ShareButton';
import ImageWithFallback from '../../components/Image/ImageWithFallback';


export const BlogDetail = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setErorr] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        GetWithToken(
            {
                url: `/api/Blog/${id}`,
                token: TOKEN
            }
        ).then(rs => {
            setLoading(false);
            setData(rs.data.data);
            document.title = rs.data.data.title;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
        })
            .catch(error => {
                setErorr(true);
            })
    }, []);
    return (
        <>
            {
                loading != true ?
                    <div >
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <ImageWithFallback className="w-full h-[500px] object-cover" src={`${BASE_URL}${data.avatar}`} alt="Image Blog" />
                            <div className="p-6 container">
                                <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {data.description}</p>

                                    <p className="text-gray-800 text-lg leading-relaxed">
                                    { <div dangerouslySetInnerHTML={{ __html: data.content }} /> }
                                 </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <ImageWithFallback className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/50x50" alt="Avatar" />
                                        <div className="text-sm">
                                            <p className="text-gray-900 leading-none mb-1">{(data.updateBy.toUpperCase())}</p>
                                            <p className="text-gray-600">{moment(new Date(data.publicTime)).format("LLLL")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <ShareButton url={window.location.href}/>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <>
                        <div className="flex flex-col h-[100vh] justify-center">
                            <ReactLoading />
                        </div>
                    </>

            }
        </>
    )
}
