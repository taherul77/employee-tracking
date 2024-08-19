import React, { useState, useEffect } from "react";
import { Input } from "@/components/Ui/input";
import PropTypes from "prop-types";

export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => {
    setValue(globalFilter); // Sync local state with the global filter state
  }, [globalFilter]);

  const onChange = (event) => {
    setValue(event.target.value);
    setGlobalFilter(event.target.value || undefined); // Set undefined to clear the filter
  };

  return (
    <Input
      placeholder="Search..."
      value={value || ""}
      onChange={onChange}
      className="h-8 w-[200px] lg:w-[300px]"
    />
  );
}

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};
