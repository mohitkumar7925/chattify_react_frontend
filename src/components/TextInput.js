import React, { memo } from "react";

 const _TextInput = ({ type = "text", placeholder = "", className = "", value, onChange = () => {} }) => {
      return (
            <input
                  type={type}
                  placeholder={placeholder}
                  className={`rounded-full px-4 py-2 bg-black text-white outline outline-1
                  outline-purple-800 transition-all focus:outline-purple-600 focus:outline-none 
                  hover:shadow-md  shadow-sm border-opacity-20 ${className}`}
                  value={value}
                  onChange={onChange}
            />
      );
};

export const TextInput = memo(_TextInput)
