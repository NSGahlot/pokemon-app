import React from "react"
import { ThreeDots } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FE434E"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
    </div>
  )
}
