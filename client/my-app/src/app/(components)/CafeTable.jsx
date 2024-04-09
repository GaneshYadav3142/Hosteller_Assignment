"use client"
import React, { useEffect, useState } from 'react'
import { GET_BY_CAFE_ID, GET_CAFE_MASTER } from '../lib/graphql'
import { useQuery } from '@apollo/client'
import LoadingSpinner from './LoadingSpinner'
import CafeTable2 from './CafeTable2'

const CafeTable = () => {
  const [clickedRow, setClickedRow] = useState(null);
  const [cafeId,setCafeId]=useState(null)
  const [hostelId,setHostelId]=useState(null)
   const {loading,data,refetch:cafeRefetch}= useQuery(GET_CAFE_MASTER)
   const {loading:arrloading ,error,data:allData, refetch} = useQuery(GET_BY_CAFE_ID,{variables:{cafeId}}) 
  if (arrloading) return <LoadingSpinner/>;
  if(error) return <p>Error: {error.message}</p>;
 
console.log(data)
  const handleRowClick = (index) => {
   // refetch()
      setClickedRow(index === clickedRow ? null : index);
  };
  //const  [ tableData,setTableData ]= useState(data?.getMasterMenu)
//  useEffect (()=>{
//    if(data?.getMasterMenu?.length>0){
//     setTableData(data?.getMasterMenu)
//    } else{
//       setTableData([])
    
//    }
//  },[data])
    
  return (
    <div className='flex flex-row'>
      <div>
      {data && 
            <table className="w-[480px]">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Cafe Name</th>
                        <th className="px-4 py-2">Hostel Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.getCafeMaster?.map((item, index) => (
                        <tr
                            key={index}
                            className={`cursor-pointer ${
                                clickedRow === index ? 'bg-gray-200' : 'bg-white'
                            }`}
                            onClick={() => {
                              handleRowClick(index)
                                setCafeId(item?._id)
                              setHostelId(item?.hostel?._id)
                              refetch()
                            }}
                        >
                            <td className="px-4 py-2">{item.cafeName}</td>
                            <td className="px-4 py-2">{item?.hostel?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            </div>
            <div className='w-[80%]'>
        <CafeTable2 allMenu={allData} cafeId={cafeId} hostelId={hostelId} arrloading={arrloading}/>
        </div>
    </div>
  )
}

export default CafeTable