import React from "react"
import GenderFilter from "../dropdowns/GenderFilter"
import TypeFilter from "../dropdowns/TypeFilter"

export default function FilterDropdown({
  isOpen,
  onClose,
  typeOptions,
  genderOptions,
  onFilterChange,
  onReset,
}) {
  if (!isOpen) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className={`
        fixed md:relative inset-x-0 bottom-0 md:inset-auto
        bg-white md:bg-transparent rounded-t-lg md:rounded-none
        shadow-lg md:shadow-none z-50 md:z-auto
        max-h-[80vh] md:max-h-none overflow-y-auto
        md:grid md:grid-cols-2 md:gap-6 md:mt-6
      `}>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 md:p-0 space-y-6 md:space-y-0 md:contents">
          <div>
            <TypeFilter
              options={typeOptions}
              handleChange={onFilterChange}
            />
          </div>
          <div>
            <GenderFilter
              options={genderOptions}
              handleChange={onFilterChange}
            />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}
