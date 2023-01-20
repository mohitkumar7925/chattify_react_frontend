import React, { memo } from "react";
import { InfinitySpin } from "react-loader-spinner";
 const _Loader = () => {
      return (
            <div className="absolute h-full w-full flex flex-col items-center justify-center z-50 bg-black bg-opacity-20 backdrop-blur-sm
            transition-all
            ">
                  <InfinitySpin width="200" color="#a958f9" />
            </div>
      );
};


export const Loader = memo(_Loader)