import React from "react";
import Select from "./Select";

export default function TypeFilter({ options, handleChange }) {
  return (
    <Select
      placeholder="Type"
      options={options}
      handleChange={handleChange}
      filterType="types"
      isMultiColumn={true}
    />
  );
}
