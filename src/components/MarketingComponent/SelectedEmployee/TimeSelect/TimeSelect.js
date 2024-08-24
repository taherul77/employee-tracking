"use client";
import { useState } from "react";

const TimeSelect = ({ placeholder, defaultValue, onTimeChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setValue(time);
    onTimeChange(time); 
  };

  return (
    <>
      <input
        type="time"
        value={value}
        onChange={handleTimeChange}
        placeholder={placeholder}
        className="h-auto border cursor-pointer rounded-md w-[140px] p-2"
        autoComplete="off"
      />
    </>
  );
};

export default TimeSelect;
