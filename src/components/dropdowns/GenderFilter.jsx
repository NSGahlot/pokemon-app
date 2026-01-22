import React from "react";
import Select from "./Select";

export default function GenderFilter({ options, handleChange }) {
  return (
    <Select
      placeholder="Gender"
      options={options}
      handleChange={handleChange}
      filterType="gender"
    />
  );
}
