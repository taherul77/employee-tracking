"use client"
import React from 'react'
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("../../../../components/Map/MapComponent.jsx"), { ssr: false });

const page = () => {
  return (
    <MapComponent></MapComponent>
  )
}

export default page