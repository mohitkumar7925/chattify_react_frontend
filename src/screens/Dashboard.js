import React, { useCallback, useEffect, useState } from "react";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Loader } from "../components/Loader";
import { Axios } from "../utils/Axios";

let socket = null;

export const Dashboard = () => {
      const [message, setMessage] = useState("");
      const [userList, setUserList] = useState([]);
      const [user, setUser] = useState({});
      const [chatHistory, setChatHistory] = useState([]);
      const [extendHistory, setExtendHistory] = useState([]);
      const [toUser, setToUser] = useState("");
      const [chatID, setChatID] = useState("");

      const [isConnected, setIsConnected] = useState(false);

      const addMessage = useCallback(
            (res) => {
                  setExtendHistory((prev) => [...prev, res]);
            },
            [extendHistory]
      );

      // const initialize = () => {

      //       const socket = io("http://10.1.4.1:4001");

      //       socket.on("connect", (sock) => {
      //             console.log("connect");
      //             setIsConnected(true);
      //       });

      //       socket.on("disconnect", () => {
      //             setIsConnected(false);
      //             console.log("disconnect");
      //       });
      //       let iam = JSON.parse(localStorage.getItem("user"));
      //       setUser(iam);

      //       socket.on(iam.user_id, (res) => {
      //             console.log("Message received", res);
      //             addMessage(res);
      //       });
      // };

      useEffect(() => {
            getUserList();

            socket = io("http://10.1.4.1:4001");

            socket.on("connect", (sock) => {
                  console.log("connect");
                  setIsConnected(true);
            });

            socket.on("disconnect", () => {
                  setIsConnected(false);
                  console.log("disconnect");
            });
            let iam = JSON.parse(localStorage.getItem("user"));
            setUser(iam);

            socket.on(iam.user_id, (res) => {
                  console.log("Message received", res);
                  addMessage(res);
            });

            // initialize();

            return () => {
                  socket.disconnect();
            };
      }, []);

      const sendMessage = () => {
            console.log("send message ", message);
            let data = {
                  message: message,
                  fromUser_id: user?.user_id,
                  toUser_id: toUser?.user_id,
                  chat_id: chatID,
            };
            socket.emit("message", data);
            // setChatHistory([...chatHistory, data]);
            // addMessage(data)
            setMessage("");
      };

      const getUserList = async () => {
            try {
                  let usr = JSON.parse(localStorage.getItem("user"));
                  let res = await Axios.post("userList", {
                        mobile: usr.mobile,
                  });
                  console.log(res);
                  if (res.data.status) {
                        setUserList(res.data.data);
                  } else {
                        setUserList([]);
                  }
            } catch (error) {
                  console.log("error", error);
            }
      };

      const getChatId = async (item) => {
            try {
                  setToUser(item);
                  console.log(item);
                  let res = await Axios.post("/chat", {
                        user_id: user?.user_id,
                        mobile: item.mobile,
                  });
                  console.log(res.data);

                  setExtendHistory([]);
                  if (res.data.status) {
                        setChatHistory(res.data.chatHistory);

                        setChatID(res.data.chat_id);
                        // toast(res.data.message, { type: "success" });
                  } else {
                        setChatHistory([]);
                        setChatID("");
                        toast(res.data.message, { type: "error" });
                  }
            } catch (error) {
                  console.log("error", error);
                  toast(error, { type: "error" });
            }
      };

      return (
            <div className="  bg-purple-900 flex-1 pb-10 flex">
                  {!isConnected && <Loader />}
                  <div className="flex flex-col grow container mx-auto">
                        <div className="font-semibold text-white text-2xl px-3 pt-3">Chattify</div>

                        <div className=" flex grow flex-row p-2 pb-6  overflow-auto ">
                              <div
                                    className={`w-full m-1 flex flex-col sm:flex sm:w-[30%]    bg-[#000000] rounded-3xl 
                         ${toUser != "" ? "hidden" : "w-full"}`}
                              >
                                    <div
                                          className="bg-black p-2 rounded-3xl flex flex-row items-center border border-purple-400 
                                    border-opacity-30 m-3"
                                    >
                                          <img src="logo192.png" className="w-6" />
                                          <div className="pl-3 text-sm text-white">{user?.name}</div>
                                    </div>
                                    <div className=" mx-2 rounded-3xl flex  flex-col pb-1 flex-1 ">
                                          {userList.map((item, index) => {
                                                return (
                                                      <div
                                                            onClick={() => getChatId(item)}
                                                            className="my-1 py-1 px-3 flex flex-row items-center 
                                                      border border-opacity-0 border-purple-300
                                                      hover:border-opacity-20 hover:bg-white transition-all
                                                      rounded-2xl text-white hover:text-black"
                                                      >
                                                            <img src="logo192.png" className="w-5 object-contain" />
                                                            <div className="pl-3">
                                                                  <div className="text-sm  ">{item?.name}</div>
                                                                  <div className="text-xs text-gray-400">Hello Ajay</div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              </div>

                              <div className={`w-full flex  flex-col m-1 sm:w-[70%] bg-[#000000]  rounded-3xl ${toUser != "" ? "" : "hidden"}`}>
                                    <div className="flex  flex-row gap-3 items-center  text-white bg-gray-900 px-5 py-3 rounded-t-3xl">
                                          <IoMdArrowBack
                                                size={20}
                                                className={`sm:w-0 `}
                                                onClick={() => {
                                                      setToUser("");
                                                      setChatHistory([]);
                                                      setExtendHistory([]);
                                                }}
                                          />
                                          <div>{toUser?.name}</div>
                                    </div>
                                    <div className="flex flex-col  overflow-y-auto flex-1 justify-between">
                                          <div className=" flex flex-1   flex-col text-white p-3 text-sm justify-end">
                                                {chatHistory.concat(extendHistory).map((item, index) => {
                                                      return item?.toUser_id == user?.user_id ? (
                                                            <div className="self-start transition-all bg-white text-black px-2 py-1 rounded-r-lg rounded-b-lg my-1"> {item?.message}</div>
                                                      ) : (
                                                            <div className="self-end transition-all  bg-green-900 bg-opacity-80 px-2 py-1 rounded-l-lg rounded-b-lg my-1"> {item?.message}</div>
                                                      );
                                                })}
                                          </div>
                                    </div>
                                    <div className="justify-between flex   flex-row items-center m-2 text-white bg-gray-900 px-5 py-3 rounded-3xl ">
                                          <input value={message} onChange={(val) => setMessage(val.target.value)} type={"text"} placeholder="Message..." className="bg-transparent outline-none hover:outline-none grow" />
                                          <IoMdSend
                                                size={20}
                                                onClick={() => {
                                                      sendMessage();
                                                }}
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
