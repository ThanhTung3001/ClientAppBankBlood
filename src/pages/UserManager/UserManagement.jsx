import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { AiFillPlusSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';
import TableOne from '../../components/TableOne';
import BrandOne from '../../images/brand/brand-01.svg'
import BrandTwo from '../../images/brand/brand-02.svg'
import BrandThree from '../../images/brand/brand-03.svg'
import BrandFour from '../../images/brand/brand-04.svg'
import BrandFive from '../../images/brand/brand-05.svg'

export const UserManagement = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Users' />

            {/* <!-- ====== Calendar Section Start ====== --> */}
            <div className='w-full max-w-full rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div className="flex flex-row justify-end p-6">
                    <button
                        onClick={() => { }}
                        className='inline-flex items-center justify-center gap-2.5 bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-lg'
                    >
                        <AiFillPlusSquare />
                        Add User
                    </button>
                </div>
                <div className="flex flex-col ">
                    <div
                        className="shadow-default rounded-sm border border-stroke dark:border-strokedark bg-white dark:bg-boxdark pt-6 pb-2.5 xl:pb-1 px-5 sm:px-7.5">
                        <h4 className="font-semibold text-xl text-black dark:text-white mb-6">Top Channels</h4>

                        <div className="flex flex-col">
                            <div className="grid grid-cols-4 sm:grid-cols-7 bg-gray-2 dark:bg-meta-4 rounded-sm">
                                <div className="p-2.5 xl:p-5">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">Index</h5>
                                </div>

                                <div className="p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">UserName</h5>
                                </div>
                                <div className="hidden sm:block p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">FullName</h5>
                                </div>
                                <div className="hidden sm:block p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">BithDate</h5>
                                </div>
                                <div className="hidden sm:block p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">Avatar</h5>
                                </div>
                                <div className="hidden sm:block p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">Roles</h5>
                                </div>
                                <div className="hidden sm:block p-2.5 xl:p-5 text-center">
                                    <h5 className="font-medium text-sm xsm:text-base uppercase">Handler</h5>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-7 border-b border-stroke dark:border-strokedark">
                                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                    <div className="flex-shrink-0"><img src={BrandOne} alt="Brand" /></div>
                                    <p className="hidden sm:block text-black dark:text-white">Google</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">3.5K</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-meta-3">$5,768</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">590</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-meta-5">4.8%</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ====== Calendar Section End ====== --> */}
        </DefaultLayout>
    )
}

