"use client"
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { CREATE_CAFEWISE_MENU, GET_BY_CAFE_ID } from '../lib/graphql'
import moment from 'moment'
import LoadingSpinner from './LoadingSpinner'

const CafeTable2 = ({allMenu,cafeId,hostelId}) => {
  console.log(allMenu)
   const [tableData,setTableData ]=useState(allMenu?.getCafewiseMenuBycafeId)
   const [addCafewiseMenu,setAddCafeWiseMenu]= useState([])
   const [createHandler, { data }] = useMutation(CREATE_CAFEWISE_MENU);
  
   // if(arrloading)  return <LoadingSpinner/>
   useEffect(()=>{
   if(allMenu){ 
    const  newArray =[]
     tableData.forEach((el)=>{
      let newObj={
        item:el?._id,
        // itemName:el?.itemName,
        // itemCategory:el?.itemCategory,
        hostel:hostelId,
        cafe:cafeId,
        startTime:el?.startTime || "",
        endTime:el?.endTime || "",
        active: el?.active || false,
      soldOut:el?.soldOut || false,
      tat:el?.tat || 0,
      seasonCharge:el?.seasonCharge || 0
      }
      newArray.push(newObj)
     })
     setAddCafeWiseMenu(newArray)
   }
  
   },[allMenu,cafeId])
     
   
   console.log("cafewise",addCafewiseMenu)
    const handleInputChange = (index, field, value) => {

      const updatedData = [...addCafewiseMenu];
      updatedData[index] = { ...updatedData[index], [field]: value };
      setAddCafeWiseMenu(updatedData);
    };
  
    const handleCheckboxChange = (index, field) => {
      const updatedData = [...addCafewiseMenu];
      updatedData[index] = { ...updatedData[index], [field]: !updatedData[index][field] };
      setAddCafeWiseMenu(updatedData);
    };
   
    const handleSubmit = () => {
      //console.log("tableData",tableData)
      console.log("cafewiseMeu",addCafewiseMenu)

      // Iterate over each object in tableData
    const  newArray=addCafewiseMenu?.map((ele) => {
        // Check if the object has all the required properties
        if (ele?.startTime && ele?.endTime && ele?.tat) {
          // Create a new object with additional properties based on the existing object
          return  {
            item: ele?.item,
            hostel: hostelId,
            cafe: cafeId,
            startTime:  moment(ele?.startTime,'HH:mm').format(),
            endTime:  moment(ele?.endTime,'HH:mm').format(),
            tat: Number(ele?.tat),
            seasonCharge: Number(ele?.seasonCharge),
            active: ele?.active,
            soldOut: ele?.soldOut
          }
        }
          return null
          // Push the new object into the newArray
          //newArray.push(newObj);
        
    }).filter(Boolean)

    console.log("submit array",newArray)
    createHandler({ variables: { cafewiseMenuInput:newArray } });
    };
  return (
    <div className='overflow-x-auto w-full flex flex-col'>
      <div>
  {tableData && cafeId && (
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season Charge</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((ele, i) => (
              <tr key={i} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{ele.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ele.itemCategory }</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="time" id="startTime" name="startTime" className="w-full px-4 py-2 
                  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
                  defaultValue={ele?.startTime!==null ? moment(ele?.startTime).format ("HH:mm"):""} onChange={(e) => handleInputChange(i, 'startTime', e.target.value)}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="time" defaultValue={ele?.endTime!==null ? moment(ele?.endTime).format ("HH:mm"):""} onChange={(e) => handleInputChange(i, 'endTime', e.target.value)} id="endTime" name="endTime" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </td>
                <td className="px-2 m-3 py-4 whitespace-nowrap">
                  <input type="number" name="tat" value={ele?.tat}  onChange={(e) => handleInputChange(i, 'tat', e.target.value)} className="w-full  py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="number" value={ele?.seasonCharge} name="seasonCharge" id="seasonCharge"  onChange={(e) => handleInputChange(i, 'seasonCharge', e.target.value)}  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" checked={ele?.soldOut} name="soldOut" id="soldOut"  
                  onChange={() => handleCheckboxChange(i, 'soldOut')}
                  className="w-6 h-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" checked={ele?.active} name="active" id="active" 
                  onChange={() => handleCheckboxChange(i, 'active')} className="w-6 h-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div className="flex justify-end mt-4">
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
     onClick={ handleSubmit}
    >Submit</button>
  </div>
      </div>
  )
}

export default CafeTable2