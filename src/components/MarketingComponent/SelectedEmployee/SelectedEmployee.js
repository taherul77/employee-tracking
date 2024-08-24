"use client";
import React, { useState, useEffect } from "react";
import DesignationSelect from "./DesignationSelect/DesignationSelect";
import TimeSelect from "./TimeSelect/TimeSelect";
import EmployeeSelect from "./EmployeeSelect/EmployeeSelect";
import { Columns } from "@/components/Table/TableComponents/columns";
import DataTable from "@/components/Table/TableComponents/DataTable";
import DateSelect from "@/components/Ui/DateSelect/DateSelect";
import { Button } from "@/components/Ui/button";

const SelectedEmployee = ({ designations, allEmployee, allLocationEmployee }) => {
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployee);
  const [filteredLocationEmployees, setFilteredLocationEmployees] = useState(allLocationEmployee);
  const [employeeSelected, setEmployeeSelected] = useState(null);
  const [matchingEmployees, setMatchingEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Set default times from 6:00 AM to 6:00 PM
  const [fromTime, setFromTime] = useState("06:00");
  const [toTime, setToTime] = useState("18:00");

  useEffect(() => {
    if (selectedDesignation) {
      const filtered = allEmployee.filter(
        (employee) => employee.designationCode === selectedDesignation && employee.empName !== "VACANT"
      );
      setFilteredEmployees(filtered);

      const filteredLocationData = allLocationEmployee.filter((locationEmployee) =>
        filtered.some((employee) => employee.mkgProfNo === locationEmployee.mkgProfNo)
      );
      setFilteredLocationEmployees(filteredLocationData);
    } else {
      const filteredAllEmployees = allEmployee.filter(employee => employee.empName !== "VACANT");
      setFilteredEmployees(filteredAllEmployees);

      const filteredAllLocationEmployees = allLocationEmployee.filter(locationEmployee => 
        filteredAllEmployees.some(employee => employee.mkgProfNo === locationEmployee.mkgProfNo)
      );
      setFilteredLocationEmployees(filteredAllLocationEmployees);
    }
  }, [selectedDesignation, allEmployee, allLocationEmployee]);

  useEffect(() => {
    if (employeeSelected) {
      const matching = allEmployee.filter(
        (employee) => employee.ptgprofno === employeeSelected && employee.empName !== "VACANT"
      );

      const filteredChildEmployees = allLocationEmployee.filter(locationEmployee => 
        matching.some(employee => employee.mkgProfNo === locationEmployee.mkgProfNo)
      );
      
      setMatchingEmployees(filteredChildEmployees);
    } else {
      setMatchingEmployees([]);
    }
  }, [employeeSelected, allEmployee, allLocationEmployee]);

  // Function to compare date for filtering
  const filterByDate = (dataArray) => {
    return dataArray.filter((item) => {
      const itemDate = new Date(item.gpsDataDate);
      return itemDate.toDateString() === selectedDate.toDateString();
    });
  };

  // Function to compare time for filtering
  const filterByTime = (dataArray) => {
    return dataArray.filter((item) => {
      const itemTime = new Date(`1970-01-01T${convert12to24(item.gpsDataTime)}`); // Convert item time to 24-hour format
      const fromTimeObj = new Date(`1970-01-01T${fromTime}`);
      const toTimeObj = new Date(`1970-01-01T${toTime}`);

      return itemTime >= fromTimeObj && itemTime <= toTimeObj;
    });
  };

  // Helper function to convert 12-hour format to 24-hour format
  const convert12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  // Determine the data to display in the table
  let dataToDisplay = employeeSelected
    ? matchingEmployees
    : selectedDesignation
    ? filteredLocationEmployees
    : allLocationEmployee;

  // Apply date and time filtering
  dataToDisplay = filterByDate(dataToDisplay);
  dataToDisplay = filterByTime(dataToDisplay);

  return (
    <div className="flex flex-col items-center gap-4 py-10 justify-center ">
      <div className="flex flex-wrap gap-4   ">
        <DesignationSelect
          designations={designations}
          onDesignationSelect={(code) => setSelectedDesignation(code)}
        />
        {selectedDesignation && (
          <>
            <EmployeeSelect employees={filteredLocationEmployees} setEmployeeSelected={setEmployeeSelected} />
            <DateSelect onDateChange={setSelectedDate} />
            <TimeSelect placeholder="from time" defaultValue="06:00" onTimeChange={setFromTime} />
            <TimeSelect placeholder="to time" defaultValue="18:00" onTimeChange={setToTime} />
            
          </>
        )}
      </div>
      <DataTable data={dataToDisplay} columns={Columns}   />
    </div>
  );
};

export default SelectedEmployee;
