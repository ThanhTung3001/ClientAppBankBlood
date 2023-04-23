import React, { useState } from "react";
// import { arrayMenu } from "../header";
import { Link } from "react-router-dom";
import '../Layout/index.scss';
import { Logo } from "../Logo";

import { arrayMenu } from "../Layout/Header";

const Drawer = ({ isOpen, onClose }) => {
  const [select, setSelected] = useState(0);
  return (
    <div
      className={`fixed inset-0 overflow-hidden transform transition-all z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <section className="absolute inset-y-0 right-0 flex max-w-[60%] pl-10">
          <div className="w-screen max-w-md">
            <div className="h-full divide-y divide-gray-200 bg-white shadow-xl overflow-y-auto">
              <div className="py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-bold text-gray-900"><Logo /></h2>
                  <button
                    className="ml-3 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 relative">
                  <ul className="flex justify-start flex-col">
                    {
                      (arrayMenu).map((e, index) => {
                        return <li key={index} className={`item ${index === select ? 'item-active' : ''} w-full pt-4 pb-4`}
                          onClick={() => {
                            setSelected(index);
                          }}><Link to={e.path}>{e.name}</Link></li>
                      })
                    }
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Drawer;
