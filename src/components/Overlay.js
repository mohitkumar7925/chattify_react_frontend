import React, { memo } from "react";
import { InfinitySpin } from "react-loader-spinner";
 const _Overlay = ({className , children}) => {
      return (
            <div className={`absolute h-full w-full flex flex-col items-center justify-center z-50 bg-black bg-opacity-20 backdrop-blur-sm
            
            transition-opacity
   
            ${className}
            `}>
                  {children}
            </div>
      );
};


export const Overlay = memo(_Overlay)