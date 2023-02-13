import React, { memo } from "react";

 const _Button = ({ children, className="" , onClick = () =>{} , outline  }) => {
      return (
            <button
                  className={`bg-gradient-to-r
                            hover:shadow-md
                            shadow-purple-200
                            mt-3
                        border-purple-500
                        ${outline ? 
                              'border border-purple-500 hover:text-white text-gray-200' 
                        : 
                        ' from-purple-500 to-indigo-400' } 
                            py-2 px-4 rounded-full text-white font-semibold ${className}`}
            
           onClick={e=>{
            e.preventDefault();
            onClick()

           }}
           >
                  {children}
            </button>
      );
};
export const Button = memo(_Button)