/* eslint-disable max-len */
import React from "react"

export default function Layout({ children }) {
  return (
    <div className="w-[390px] container  mx-auto sm:w-[1512px] sm:mx-auto">
      <header className="mt-8 sm:pl-[92px]">
        <nav>
          <div className=" flex flex-col pl-6 sm:flex-row  sm:items-center">
            <h1 className="text-[30px] w-[128px] pb-4 font-bold text-[#2E3156] leading-6 tracking-wide inline-block">
              Pokédex
            </h1>
            <hr className="w-[318px] sm:w-[53px] sm:rotate-90" />
            <span className="text-[16px] w-[318px] pb-4 pt-2 text-[#5D5F7E] font-[500] tracking-normal leading-6 sm:w-[439px]  ">
              Search for any Pokémon that exists on the planet
            </span>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
