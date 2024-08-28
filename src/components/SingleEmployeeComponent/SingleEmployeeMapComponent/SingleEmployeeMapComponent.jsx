"use client";

import React from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import L from "leaflet";
import useStore from "@/store/store";
import Image from "next/image";
import "./style.css";

const SingleEmployeeMapComponent = () => {
  const { singleData } = useStore();

  console.log("singleData", singleData);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp)); 
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options); 
  };

  const isValidLocation =
    singleData && singleData.mlatitute && singleData.mlongitute;

  return (
    <div>
      {isValidLocation && (
        <MapContainer
          center={[singleData.mlatitute, singleData.mlongitute]}
          zoom={14}
          className="w-full z-10 h-[100vh]"
        >
          <ReactLeafletGoogleLayer apiKey={process?.env?.NEXT_PUBLIC_GOOGLE_API_KEY} />

          <Marker
            position={[singleData.mlatitute, singleData.mlongitute]}
            icon={L.divIcon({
              className: "circular-icon",
              iconSize: [28, 28],
              html: `<div class="circular-marker" style="background-image: url('${singleData.profPhoto}');"></div>`,
            })}
          >
            <Popup>
              <div className="container flex flex-col w-[210px] divide-y rounded-md">
                <div className="p-2">
                  <div className="flex items-center space-x-2 gap-2">
                    <div>
                      {singleData.profPhoto && (
                        <Image
                          height={40}
                          width={40}
                          alt={`Profile of ${singleData.employeName}`}
                          src={singleData.profPhoto}
                          className="object-cover w-12 h-16 rounded-sm"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">
                        {singleData.employeName} ({singleData.mkgProfNo})
                      </h4>
                      <span className="text-xs">
                        Date: {formatDate(singleData.gpsDataDate)}
                      </span>
                      <br />
                      <span className="text-xs">
                        Time: {singleData.gpsDataTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm p-2">
                  <h4>{singleData.gpslocalName}</h4>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default SingleEmployeeMapComponent;
