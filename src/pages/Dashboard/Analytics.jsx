import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour';
import ChatCard from '../../components/ChatCard';
import TableOne from '../../components/TableOne'
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ChartThree from '../../components/ChartThree';
import MapOne from '../../components/MapOne'
import axios from 'axios';
import { BASE_URL } from '../../BaseUrl';

const Analytics = () => {
  const [data,setData] = useState({});
  useEffect(()=>{
     axios.get(BASE_URL+"/api/Statistical/Gets")
     .then(e=>{
       if(e.status==200){
          setData(e.data);
       }
     })
  },[]);
  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne value={data.totalBlog} />
        <CardTwo value={data.totalEvent} />
        <CardThree value={data.totalRegis} />
        <CardFour value={data.totalUser} />
      </div>

      <div className='mt-4 w-full'>
        <ChartOne data={data.regisGroupBy} />
      

      </div>
    </DefaultLayout>
  )
}

export default Analytics;
