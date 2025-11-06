import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

const Input = React.forwardRef(
  (
    { isPassword = false, showPassword, setShowPassword, className, placeholder, type, error, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`border-2 px-3 py-2 outline-none rounded-[10px] ${
            error ? "border-red-500" : "border-white"
          } ${className}`}
          {...props} // register() dan kelgan onChange, onBlur, name shu yerda ishlaydi
        />
        {error && <p className="text-red-500 text-sm text-start cursor-pointer">{error}</p>}
        {isPassword && !showPassword && <button onClick={() => setShowPassword(true)} className="absolute right-2 top-3 cursor-pointer"><Eye className="text-white"/></button>}
        {isPassword && showPassword && <button onClick={() => setShowPassword(false)} className="absolute right-2 top-3 cursor-pointer"><EyeClosed className="text-white cursor-pointer"/></button>}
      </div>
    );
  }
);

export default Input;
