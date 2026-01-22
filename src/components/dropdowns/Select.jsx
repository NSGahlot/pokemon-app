import React, { useEffect, useRef, useState } from "react";

const toUpperCase = (str) => {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function Select({
  placeholder = "Select Options",
  options = [],
  handleChange,
  filterType,
  isMultiColumn = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = options.filter((option) => option.ischecked);
  const selectedCount = selectedOptions.length;
  const firstSelected = selectedOptions[0];

  const displayText = () => {
    if (selectedCount === 0) {
      return "None selected";
    }
    if (selectedCount === 1) {
      return toUpperCase(firstSelected.value);
    }
    return `${toUpperCase(firstSelected.value)} +${selectedCount - 1} more`;
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Label */}
      <label className="block text-sm font-bold text-yellow-300 mb-3 uppercase tracking-widest drop-shadow-lg">
        {placeholder === "Type" ? "⚡" : "👥"} {placeholder}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`
          w-full flex items-center justify-between px-5 py-3
          bg-gray-800 border-2 rounded-lg font-semibold
          hover:shadow-lg focus:outline-none transition-all duration-300
          min-h-[48px] text-gray-100
          ${isOpen 
            ? "border-yellow-400 shadow-lg shadow-yellow-400/50 ring-2 ring-yellow-400 bg-gray-900" 
            : "border-gray-600 hover:border-yellow-400 hover:shadow-md shadow-md"
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm font-semibold truncate text-left">
          {displayText()}
        </span>
        <svg
          className={`w-5 h-5 text-yellow-400 transition-transform duration-300 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-gray-800 border-2 border-yellow-400 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
          <div
            className={`p-3 ${
              isMultiColumn ? "grid grid-cols-2 gap-2" : "space-y-2"
            }`}
            role="listbox"
          >
            {options.map((option) => (
              <label
                key={option.id || option.value}
                className="flex items-center p-3 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-red-600 rounded cursor-pointer transition-all duration-200 border border-transparent hover:border-yellow-300"
              >
                <input
                  type="checkbox"
                  checked={option.ischecked || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleChange?.(e.target, filterType);
                  }}
                  value={option.value}
                  className="w-5 h-5 text-yellow-400 border-2 border-gray-600 rounded focus:ring-yellow-400 cursor-pointer accent-yellow-400"
                />
                <span className="ml-3 text-sm font-semibold text-gray-100">
                  {toUpperCase(option.value)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
