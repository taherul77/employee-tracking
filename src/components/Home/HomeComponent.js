"use client";
import React, { useEffect, useMemo } from "react";
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

  // Fetching allEmployee data using Redis
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

  const filteredAllLocationEmployee = useMemo(() => {
    return allLocationEmployee?.reduce((acc, current) => {
      const existingEmployee = acc.find(
        (item) => item.mkgProfNo === current.mkgProfNo
      );
      if (
        !existingEmployee ||
        current.gpsDataDateTime > existingEmployee.gpsDataDateTime
      ) {
        return acc
          .filter((item) => item.mkgProfNo !== current.mkgProfNo)
          .concat(current);
      }
      return acc;
    }, []);
  }, [allLocationEmployee]);

  const nonVacantEmployees = useMemo(() => {
    return allEmployee?.filter((employee) => employee.empName !== "VACANT");
  }, [allEmployee]);

  const totalNonVacantEmployees = nonVacantEmployees?.length || 0;

  const { activeCount, inactiveCount, activeEmployees } = useMemo(() => {
    let active = 0;
    let inactive = 0;
    const activeEmps = [];

    nonVacantEmployees?.forEach((employee) => {
      const isActive = filteredAllLocationEmployee?.some(
        (locationEmployee) => locationEmployee.mkgProfNo === employee.mkgProfNo
      );

      if (isActive) {
        active++;
        activeEmps.push(employee);
      } else {
        inactive++;
      }
    });

    console.log("Active Count:", active);
    console.log("Inactive Count:", inactive);
    return {
      activeCount: active,
      inactiveCount: inactive,
      activeEmployees: activeEmps,
    };
  }, [nonVacantEmployees, filteredAllLocationEmployee]);

  console.log("Active Count:", activeCount);

  const {
    morningShiftEmployees,
    eveningShiftEmployees,
    inactiveMorningEmployees,
    inactiveEveningEmployees,
  } = useMemo(() => {
    if (!allEmployee || !allLocationEmployee) {
      return {
        morningShiftEmployees: [],
        eveningShiftEmployees: [],
        inactiveMorningEmployees: [],
        inactiveEveningEmployees: [],
      };
    }

    const morningShiftMap = new Map();
    const eveningShiftMap = new Map();

    allLocationEmployee.forEach((employee) => {
      const [time, period] = employee.gpsDataTime.split(" ");
      const [hours, minutes] = time.split(":").map(Number);

      let gpsHour = hours;
      if (period === "PM" && hours !== 12) {
        gpsHour += 12;
      } else if (period === "AM" && hours === 12) {
        gpsHour = 0;
      }

      if (gpsHour >= 6 && gpsHour < 14) {
        const existing = morningShiftMap.get(employee.mkgProfNo);
        if (
          !existing ||
          new Date(employee.gpsDataDateTime) >
            new Date(existing.gpsDataDateTime)
        ) {
          morningShiftMap.set(employee.mkgProfNo, employee);
        }
      } else if (gpsHour >= 14 && gpsHour < 22) {
        const existing = eveningShiftMap.get(employee.mkgProfNo);
        if (
          !existing ||
          new Date(employee.gpsDataDateTime) >
            new Date(existing.gpsDataDateTime)
        ) {
          eveningShiftMap.set(employee.mkgProfNo, employee);
        }
      }
    });

    const morningShiftEmployees = Array.from(morningShiftMap.values());
    const eveningShiftEmployees = Array.from(eveningShiftMap.values());

    const inactiveMorningEmployees = [];
    const inactiveEveningEmployees = [];

    nonVacantEmployees.forEach((employee) => {
      const isMorningActive = morningShiftEmployees.some(
        (emp) => emp.mkgProfNo === employee.mkgProfNo
      );
      const isEveningActive = eveningShiftEmployees.some(
        (emp) => emp.mkgProfNo === employee.mkgProfNo
      );

      if (!isMorningActive) {
        inactiveMorningEmployees.push(employee);
      }

      if (!isEveningActive) {
        inactiveEveningEmployees.push(employee);
      }
    });


    return {
      morningShiftEmployees,
      eveningShiftEmployees,
      inactiveMorningEmployees,
      inactiveEveningEmployees,
    };
  }, [allEmployee, allLocationEmployee, nonVacantEmployees]);

  const totalMorningEmployees = morningShiftEmployees.length;
  const totalEveningEmployees = eveningShiftEmployees.length;
  const totalInactiveMorning = inactiveMorningEmployees.length;
  const totalInactiveEvening = inactiveEveningEmployees.length;

  console.log("Total Morning Employees:", totalMorningEmployees);
  console.log("Total Evening Employees:", totalEveningEmployees);
  console.log("Total Inactive Morning:", totalInactiveMorning);
  console.log("Total Inactive Evening:", totalInactiveEvening);

  // Check current time to determine if it is evening
  const now = new Date();
  const currentHour = now.getHours();
  const isEvening = currentHour >= 14 && currentHour < 22;

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
      {/* <div className="px-2 py-5">
        <MonthReport />
      </div> */}
      <div className="flex flex-wrap justify-center gap-5 py-5">
        <WeekReport />
        <DailyReport
          totalEmployees={totalNonVacantEmployees}
          activeCount={activeCount}
          inactiveCount={inactiveCount}
        />
        <MorningShift
          activeEmployees={totalMorningEmployees}
          totalInactiveMorning={totalInactiveMorning}
        />
        {isEvening && (
          <EveningShift
            totalEveningEmployees={totalEveningEmployees}
            totalInactiveEvening={totalInactiveEvening}
          />
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
