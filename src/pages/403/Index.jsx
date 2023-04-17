import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
// import './index.css';

export const Forbidden = () => {
    const navigate = useNavigate();
    return (

        <div className="flex w-full h-[100vh] flex-col justify-center items-center">
            <h1 className='mb-1 text-4xl'>403</h1>
            <h3 className='mt-1'>You don't have permission</h3>
            <Button secondary><Link className='text-white' to='/'>Back To Home</Link></Button>
        </div>
    )
}
