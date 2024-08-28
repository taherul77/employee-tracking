/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-polylinedecorator";
import "./road.css";
import { GrPowerReset } from "react-icons/gr";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { Tooltip } from "react-leaflet";
import { FaPlay, FaPause, FaStepBackward } from "react-icons/fa";

const RoadMapComponent = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isDriftMarkerActive, setIsDriftMarkerActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const map = useMap();
  const intervalRef = useRef(null);
  const circularIcon = L.divIcon({
    className: "circular-icon",
    iconSize: [36, 36],
    html: `<div class="circular-marker" style="background-image: url('${current?.profPhoto}');"></div>`,
  });

  useEffect(() => {
    if (
      !data ||
      data === null ||
      data === undefined ||
      !isDriftMarkerActive ||
      !isPause
    ) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= data.length ? prevIndex : nextIndex;
      });
    }, 6000 / speedMultiplier);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [data, isDriftMarkerActive, speedMultiplier, isPause]);

  useEffect(() => {
    const selectedData = data && data[currentIndex];
    setCurrent(selectedData);
  }, [data, currentIndex]);

  const handleSpeedIncrease = () => {
    setSpeedMultiplier((prevMultiplier) => {
      const newMultiplier = prevMultiplier + 1;
      return newMultiplier <= 7 ? newMultiplier : prevMultiplier;
    });
  };

  const handleSpeedDecrease = () => {
    setSpeedMultiplier((prevMultiplier) => {
      const newMultiplier = prevMultiplier - 1;
      return newMultiplier >= 1 ? newMultiplier : prevMultiplier;
    });
  };

  const handleSpeedReset = () => {
    setSpeedMultiplier(1);
    setCurrentIndex(0);
  };

  const handleToggleDriftMarker = () => {
    setIsDriftMarkerActive((prev) => !prev); // Flip the value of isDriftMarkerActive
    setIsPause((prev) => !prev); // Flip the value of isPause
  };

  const generatePolylinePositions = (data) =>
    data?.map((city) => [city?.mlatitute, city?.mlongitute]);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.PolylineDecorator) {
        layer.remove();
      }
    });

    if (data && data.length > 0) {
      const startMarker = L.marker([data[0]?.mlatitute, data[0]?.mlongitute], {
        icon: createMarkerIcon("1", data[0]),
      }).addTo(map);
      map.setView([data[0]?.mlatitute, data[0]?.mlongitute], 18);
    }

    if (data && data.length > 1) {
      let segmentStartIndex = null;
      let lastLabelIndex = 1;

      for (let i = 0; i < data.length - 1; i++) {
        const start = L.latLng(data[i]?.mlatitute, data[i]?.mlongitute);
        const end = L.latLng(data[i + 1]?.mlatitute, data[i + 1]?.mlongitute);

        const isSamePosition =
          data[i]?.mlatitute === data[i + 1]?.mlatitute &&
          data[i]?.mlongitute === data[i + 1]?.mlongitute;

        if (isSamePosition && segmentStartIndex === null) {
          segmentStartIndex = i;
        } else if (!isSamePosition && segmentStartIndex !== null) {
          const rangeLabel = `${segmentStartIndex + 1}-${i + 1}`;
          const allTimes = generateAllTimesForLocation(data, data[segmentStartIndex]?.mlatitute, data[segmentStartIndex]?.mlongitute);
          createSegmentMarker(map, data[segmentStartIndex], rangeLabel, "red", allTimes);
          segmentStartIndex = null;
          lastLabelIndex = i + 2;
        }

        if (segmentStartIndex === null) {
          const color = isSamePosition ? "red" : "green";
          const polyline = L.polyline([start, end], { color: color }).addTo(map);
          const arrowDecorator = L.polylineDecorator(polyline, {
            patterns: [
              {
                offset: "50%",
                repeat: 0,
                symbol: L.Symbol.arrowHead({
                  pixelSize: 10,
                  polygon: false,
                  pathOptions: { color: color },
                }),
              },
            ],
          }).addTo(map);

          if (!isSamePosition) {
            const label = `${lastLabelIndex}`;
            lastLabelIndex++;
            const icon = createMarkerIcon(label, data[i + 1], color);
            L.marker(end, { icon }).addTo(map).bindTooltip(
              `<div>
                <b>Point ${label}</b><br>
                <span class="text-xs">Name: ${data[i + 1]?.employeName}</span><br>
                <span class="text-xs">Time: ${data[i + 1]?.gpsDataTime}</span><br>
                <span>Location: ${data[i + 1]?.gpslocalName}</span>
              </div>`
            );
          }
        }
      }

      if (segmentStartIndex !== null) {
        const rangeLabel = `${segmentStartIndex + 1}-${data.length}`;
        const allTimes = generateAllTimesForLocation(data, data[segmentStartIndex]?.mlatitute, data[segmentStartIndex]?.mlongitute);
        createSegmentMarker(map, data[segmentStartIndex], rangeLabel, "red", allTimes);
      }

      const bounds = L.latLngBounds(
        generatePolylinePositions(data),
        data.map((location) => L.latLng(location?.mlatitute, location?.mlongitute))
      );
      map.fitBounds(bounds);
    }
  }, [data, map]);

  const createSegmentMarker = (map, location, label, color, allTimes = []) => {
    const firstTime = allTimes.length > 0 ? allTimes[0] : "";
    const lastTime = allTimes.length > 0 ? allTimes[allTimes.length - 1] : "";
    const icon = createMarkerIcon(label, location, color);
    L.marker([location?.mlatitute, location?.mlongitute], { icon })
      .addTo(map)
      .bindTooltip(
        `<div>
          <b>Point ${label}</b><br>
          <span class="text-xs">Name: ${location?.employeName}</span><br>
          <span class="text-xs">First Time: ${firstTime}</span>
          <span class="text-xs">Last Time: ${lastTime}</span><br>
          <span>Location: ${location?.gpslocalName}</span>
        </div>`
      );
  };

  const generateAllTimesForLocation = (data, lat, lng) => {
    return data
      .filter(
        (item) =>
          item?.mlatitute === lat && item?.mlongitute === lng
      )
      .map((item) => item.gpsDataTime);
  };
  const createMarkerIcon = (label, location, color = "green") => {
    const span = document.createElement("span");
    span.style.fontSize = "12px";
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.innerText = label;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
  
    const colorClass = color === "red" ? "red-label-container" : "green-label-container";
  
    return L.divIcon({
      className: `custom-marker-label ${colorClass}`,
      html: `<div class="label-container" style="width: ${width}px; display: flex; align-items: center; justify-content: center;">${label}</div>`,
    });
  };
  
  

  return (
    <div>
      <div className="button-container flex gap-2 ">
        <button
          onClick={handleToggleDriftMarker}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
           font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2"
        >
          {isPause ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={handleSpeedIncrease}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
           font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2"
        >
          {speedMultiplier}X
        </button>
        <button
          onClick={handleSpeedDecrease}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
    font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2"
        >
          <FaStepBackward />
        </button>
        <button
          onClick={handleSpeedReset}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
           font-medium rounded-lg text-sm px-3 py-2.5 text-center  mb-2"
        >
          <GrPowerReset />
        </button>
      </div>
      {current && isDriftMarkerActive ? (
        <ReactLeafletDriftMarker
          position={{
            lat: current?.mlatitute,
            lng: current?.mlongitute,
          }}
          duration={5000 / speedMultiplier}
          keepAtCenter={true}
          icon={circularIcon}
        >
          <Tooltip className="container w-[23rem] p-3">
            <div className="flex flex-col  rounded-md p-2">
              <span className="text-xs">Name: {current?.employeName}</span>
              <span className="text-xs">Time: {current?.gpsDataTime}</span>
              <span className="text-xs">
                Location: {current?.gpslocalName?.substring(0, 50)} <br />{" "}
                {current?.gpslocalName?.substring(50, 80)}
              </span>
            </div>
          </Tooltip>
        </ReactLeafletDriftMarker>
      ) : null}
    </div>
  );
};

export default RoadMapComponent;
