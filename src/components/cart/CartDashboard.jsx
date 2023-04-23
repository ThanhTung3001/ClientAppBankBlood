import React from 'react'

export default function CartDashboard({type,value,description}) {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-1 ">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{type}</h5>
                <p className="font-bold text-gray-700 dark:text-gray-400 text-xl text-center">{value}</p>
                <p className="font-bold text-gray-700 dark:text-gray-400 text-sm mt-2 text-center">{description}</p>
            </div>
  )
}
