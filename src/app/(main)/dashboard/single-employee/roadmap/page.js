import React from 'react'
import dynamic from "next/dynamic";
const SingleEmployeeRoadMapComponent = dynamic(() => import("../../../../../components/SingleEmployeeComponent/SingleEmployeeRoadMapComponent/SingleEmployeeRoadMapComponent.js"), { ssr: false });

const page = () => {
  return (
    <>
     <SingleEmployeeRoadMapComponent/>
    
    
    </>
  )
}

export default page