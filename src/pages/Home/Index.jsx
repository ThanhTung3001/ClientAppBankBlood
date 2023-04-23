import React, { useEffect, useState } from 'react'
import './home.scss';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CustomButton from '../../components/button/CustomButton';
import { Slogan } from './Slogan';
import { DonateProcessing } from './DonateProcessing';
import { OurCamping } from './OurCamping';
import { Contact } from './Contact';
import { LastNews } from './LastNews';
import { Button } from 'antd';

export const HomePage = () => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    // if (typeof window.ethereum !== 'undefined') {
    //   window.ethereum.enable().then(accounts => {
    //     setConnected(true);
    //     alert('You are now connected to Metamask!');
    //   });
    // }
  }, []);
  const handlerConnectWallet = ()=>{
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', accounts => {
        console.log('Selected account:', accounts[0]);
      });
      
      window.ethereum.on('networkChanged', networkId => {
        console.log('Network ID:', networkId);
      });
    }
  }
  return (
    <>
    <div id="home">
        <div className="container h-[100%]">
           <div className="flex flex-wrap h-full">
                <div className="w-full  h-full flex flex-col justify-center items-center">
                        <h2 className='text-4xl sm:text-6xl font-bold text-gray-800 text-center md:text-left'>Donate blood, save life !</h2>
                        <p className="text-base mt-0 mb-0 sm:text-md w-full sm:w-[80%] sm:mt-4 sm:mb-4 text-gray-500 text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure accusantium magni, laborum, ducimus, saepe officiis at odio possimus quibusdam deserunt perferendis molestiae id ab aliquam reprehenderit quas earum animi consectetur.
                        </p>
                        {/* <Button size='large' type="primary" className='button-primary mt-2 sm:mt-6'>Donate now</Button> */}
                        <button className="button-36 mt-6" role="button" onClick={handlerConnectWallet}>Donate Now</button>

                </div>
               
           </div>
        </div>
    </div>
        <Slogan/>
        <DonateProcessing/>
        <OurCamping/>
        <Contact/>
        <div className="h-[100vh] flex flex-col justify-center items-center">
        <LastNews/>
        </div>
    </>
  )
}
