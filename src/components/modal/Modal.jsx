import React, { forwardRef } from "react"

export default forwardRef((props, ref) => {
  return (
    <dialog
      {...props}
      ref={ref}
      className="fixed inset-0 z-50 w-full h-full max-w-none max-h-none m-0 p-0 overflow-y-auto md:inset-4 md:w-auto md:h-auto md:max-w-4xl md:max-h-[90vh] md:mx-auto md:my-8 md:rounded-2xl md:shadow-2xl backdrop-blur-md"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)"
      }}
    >
      <div className="min-h-full md:min-h-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 md:rounded-2xl border-2 md:border-transparent md:shadow-2xl">
        <div className="absolute inset-0 md:inset-4 md:rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 80%)"
          }}
        />
        <div className="relative">
          {props.children}
        </div>
      </div>
    </dialog>
  )
})
