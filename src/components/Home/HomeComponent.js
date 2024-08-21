"use client";
import React, { useEffect } from "react";
import WeekReport from "./WeekReport/WeekReport";
import DailyReport from "./DailyReport/DailyReport";
import MorningShift from "./MorningShift/MorningShift";
import EveningShift from "./EveningShift/EveningShift";
import MonthReport from "./MonthReport/MonthReport";

import useStore from "@/store/store";
import SkeletonComponent from "../Ui/SkeletonComponent/SkeletonComponent";
import { useQuery } from "@tanstack/react-query";

const HomeComponent = () => {
  const { setDesignations, setAllEmployee, setAllLocationEmployee } = useStore();

  // Fetching allLocationEmployee data using Redis
  const {
    data: allLocationEmployee,
    isLoading: isLoadingLocations,
    error: locationError,
  } = useQuery({
    queryKey: ["allLocationEmployee"],
    queryFn: async () => {
      const response = await fetch('/api/redis/allLocationEmployee');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }
      return response.json();
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (allLocationEmployee) {
      setAllLocationEmployee(allLocationEmployee);
    }
  }, [allLocationEmployee, setAllLocationEmployee]);

  // Fetching designations data using Redis
  const {
    data: designations,
    isLoading: isLoadingDesignations,
    error: designationError,
  } = useQuery({
    queryKey: ["designations"],
    queryFn: async () => {
      const response = await fetch('/api/redis/designations');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }
      return response.json();
    },
   
  });

  useEffect(() => {
    if (designations) {
      setDesignations(designations);
    }
  }, [designations, setDesignations]);

 
  const {
    data: allEmployee,
    isLoading: isLoadingEmployees,
    error: allEmployeeError,
  } = useQuery({
    queryKey: ["allEmployee"],
    queryFn: async () => {
      const response = await fetch('/api/redis/allEmployee');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }
      return response.json();
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (allEmployee) {
      setAllEmployee(allEmployee);
    }
  }, [allEmployee, setAllEmployee]);

  if (isLoadingLocations || isLoadingEmployees || isLoadingDesignations) {
    return <SkeletonComponent />;
  }

  if (locationError || designationError || allEmployeeError) {
    return (
      <div>
        Error: {locationError?.message || designationError?.message || allEmployeeError?.message}
      </div>
    );
  }

  return (
    <div>
      <div className="px-2 py-5">
        <MonthReport />
      </div>
      <div className="flex flex-wrap justify-center gap-5 py-5">
        <WeekReport />
        <DailyReport />
        <MorningShift />
        <EveningShift />
      </div>
    </div>
  );
};

export default HomeComponent;
