"use client"
import React from "react";

import { MapContainer, Marker, Popup } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import useStore from "@/store/store";
import Image from "next/image";
import "./style.css";

const MapComponent = () => {

  const { selectedRow } = useStore();
  
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp)); // Convert timestamp to number
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options); // Format date
  };
  const position = [24, 90];
  return (
    <div>
      <MapContainer
        center={position}
        zoom={8}
        className="w-full z-10 h-[100vh] "
      >
        <ReactLeafletGoogleLayer apiKey={process?.env?.NEXT_PUBLIC_GOOGLE_API_KEY} />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={true}
        >
          {selectedRow && selectedRow.map((location, index) => {
            const markerPosition = [location.mlatitute, location.mlongitute];
            const circularIcon = L.divIcon({
              className: "circular-icon",
              iconSize: [28, 28],
              html: `<div class="circular-marker" style="background-image: url('${location.profPhoto}');"></div>`,
            });

            return (
              <Marker
                key={index}
                position={markerPosition}
                icon={circularIcon}
              >
                <Popup>
                  <div className="container flex flex-col w-[210px] divide-y rounded-md">
                    <div className="p-2">
                      <div className="flex items-center space-x-2 gap-2">
                        <div>
                          {location.profPhoto && (
                            <Image
                              height={40}
                              width={40}
                              alt={`Profile of ${location.employeName}`}
                              src={location.profPhoto}
                              className="object-cover w-12 h-16 rounded-sm"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold">
                            {location.employeName} ({location.mkgProfNo})
                          </h4>
                          <span className="text-xs">
                            Date: {formatDate(location.gpsDataDate)}
                          </span>
                          <br />
                          <span className="text-xs">
                            Time: {location.gpsDataTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm p-2">
                      <h4>{location.gpslocalName}</h4>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapComponent;





