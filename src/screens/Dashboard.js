import React from "react";

export const Dashboard = () => {
      return (
            <div className="bg-purple-900 flex flex-row h-screen p-3 gap-3">
                  <div className="w-full flex flex-col sm:w-[30%]  bg-[#000000] rounded-3xl ">
                        <div
                              className="bg-black p-2 rounded-3xl flex flex-row items-center border border-purple-400 
                        border-opacity-30 m-3"
                        >
                              <img src="logo192.png" className="w-6" />
                              <div className="pl-3 text-sm text-white">Mohit</div>
                        </div>
                        <div className=" mx-2 rounded-3xl flex flex-col grow flex-1 ">
                              {[1, 2, 3, 4, 5].map((item) => {
                                    return (
                                          <div
                                                className="my-1 py-1 px-3 flex flex-row items-center 
                                          border border-opacity-0 border-purple-300
                                          hover:border-opacity-20 hover:bg-white transition-all
                                          rounded-xl text-white hover:text-black"
                                          >
                                                <img src="logo192.png" className="w-5 object-contain"  />
                                                <div className="pl-3">
                                                      <div className="text-sm  ">Ajay</div>
                                                      <div className="text-xs text-gray-400">Hello Ajay</div>
                                                </div>
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
                  <div className="w-0 flex flex-col sm:w-[70%] bg-[#000000]  rounded-3xl ">
                        <div className="justify-between text-white bg-gray-900 px-5 py-3 rounded-t-3xl">
                            <div>
                              Ajay
                            </div>
                        </div>
                        <div className=" flex flex-1" >

                        </div>
                        <div className="justify-between row-auto m-2 text-white bg-gray-900 px-5 py-3 rounded-3xl ">
                            <input type={'text'} placeholder='Message...' className="bg-transparent"/>
                            
                        </div>
                  </div>
            </div>
      );
};
