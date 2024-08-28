"use client";

import React from "react";
import { MapContainer } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import useStore from "@/store/store";
import RoadMapComponent from "./RoadMapComponent/RoadMapComponent";
import "./style.css"
const SingleEmployeeRoadMapComponent = () => {
  const { singleData, allLocationEmployee } = useStore();
  const filteredEmployees = allLocationEmployee.filter(
    (employee) => employee.mkgProfNo === singleData.mkgProfNo
  );

  const position = [24, 90];

  return (
    <MapContainer center={position} zoom={8} className="w-full z-10 h-[100vh]">
      <ReactLeafletGoogleLayer apiKey={process?.env?.NEXT_PUBLIC_GOOGLE_API_KEY} />
      <RoadMapComponent data={filteredEmployees} />
    </MapContainer>
  );
};

export default SingleEmployeeRoadMapComponent;
