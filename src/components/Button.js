import React, { memo } from "react";

 const _Button = ({ children, className="" , onClick = () =>{} }) => {
      return (
            <button
                  className={`bg-gradient-to-r
                            hover:shadow-md
                            mt-2
                        from-purple-500 to-indigo-400 py-2 px-4 rounded-md text-white font-semibold ${className}`}
            
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