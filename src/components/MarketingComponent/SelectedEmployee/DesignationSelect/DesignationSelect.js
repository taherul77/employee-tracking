"use client"
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DesignationSelect = ({ designations, onDesignationSelect }) => {
  return (
    <Select
      className="bg-white"
      onValueChange={(value) => onDesignationSelect(value)} 
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select Designation" />
      </SelectTrigger>
      <SelectContent className="bg-white h-52">
        <SelectGroup>
          <SelectLabel>Designation</SelectLabel>
          {designations.map((designation) => (
            <SelectItem
              key={designation.designationId}
              value={designation.designationName} 
            >
              {designation.designationName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DesignationSelect;
