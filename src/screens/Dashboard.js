import React, { useCallback, useEffect, useState } from "react";
import {
    IoIosArrowDropright,
    IoMdAdd,
    IoMdArrowBack,
    IoMdClose,
    IoMdExit,
    IoMdSend,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Loader } from "../components/Loader";
import { Overlay } from "../components/Overlay";
import { login_status } from "../store/reducers/userReducer";
import { Axios } from "../utils/Axios";
import { Socket_URL } from "../utils/EndPoints";

let socket = null;

export const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState({});
    const [chatHistory, setChatHistory] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [extendHistory, setExtendHistory] = useState([]);
    const [newMobile, setNewMobile] = useState("");
    const [toUser, setToUser] = useState("");
    const [chatID, setChatID] = useState("");
    const dispatch = useDispatch();
    const [newContactModal, setNewContactModal] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const addMessage = useCallback(
        (res) => {
            if (res?.chat_id == chatID)
                setExtendHistory((prev) => [...prev, res]);
            setUserList((prev) => {
                let oldArr = prev;
                let isUser = false;
                let newArr = oldArr.map((item, index) => {
                    if (item?.chat_id == res?.chat_id) {
                        // item?.message = res?.message
                        isUser = true;
                        item['new'] = true;
                        return { ...item, message: res?.message };
                    }

                    return item;
                });
                console.log('--->>newArr',newArr);
                if (!isUser) {
                      newArr.splice(0, 0, res);
                  }
                  console.log('--->>newArr After',newArr);
                return [...newArr];
            });
        },
        [extendHistory, userList, chatID]
    );
console.log('userlist',userList);
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

        socket = io(Socket_URL);

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
            mobile: user?.mobile,
            name: user?.name,
        };
        socket.emit("message", data);
        // setChatHistory([...chatHistory, data]);
        // addMessage(data)
        setMessage("");
    };
    const logout = () => {
        dispatch(login_status(false));
        localStorage.clear();
    };
    const getUserList = async () => {
        try {
            let usr = JSON.parse(localStorage.getItem("user"));
            let res = await Axios.post("userList", {
                mobile: usr.mobile,
            });
            console.log(res.data.data);
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
            setUserList(prev=>{
                  let newList = prev.map(el=>{
                        if(item?.chat_id == el?.chat_id){
                              el['new'] = false
                        }
                        return el

                  })
                  return prev
            })
            setIsloading(true);
            setToUser(item);
            console.log(item);
            let res = await Axios.post("/chat", {
                user_id: user?.user_id,
                mobile: item.mobile,
            });
            console.log(res.data);
            setIsloading(false);
            setNewContactModal(false);
            setExtendHistory([]);
            if (res.data.status) {
                setToUser(res.data?.user);
                setChatHistory(res.data.chatHistory);
                setNewMobile("");
                setChatID(res.data.chat_id);
                // toast(res.data.message, { type: "success" });
            } else {
                setChatHistory([]);
                setChatID("");
                toast(res.data.message, { type: "error" });
            }
        } catch (error) {
            setIsloading(false);
            console.log("error", error);
            toast(error, { type: "error" });
        }
    };

    return (
        <div className="  bg-purple-900 flex-1 pb-10 flex"  style={{ backgroundImage: `linear-gradient(rgba(135, 80, 156, 0.2), rgba(135, 80, 156, 0.3)), url(login_back.jpg)` }}
        >
            {newContactModal && (
                <Overlay>
                    <IoMdClose
                        onClick={() => {
                            setNewContactModal(false);
                        }}
                        className="text-white mb-3 -mt-10 "
                    />
                    <div className="flex flex-row justify-between  max-w-[300px] w-[80%] p-3 bg-gray-800 bg-opacity-75 rounded-lg  text-white">
                        <input
                            placeholder="Enter Mobile Number"
                            className="bg-transparent outline-none"
                            value={newMobile}
                            onChange={(e) => {
                                setNewMobile(e.target.value);
                            }}
                        />
                        <div
                            onClick={() => {
                                if (newMobile != "") {
                                    setIsloading(true);
                                    getChatId({ mobile: newMobile });
                                } else {
                                    toast("Please enter the mobile number");
                                }
                            }}
                        >
                            <IoIosArrowDropright size={24} />
                        </div>
                    </div>
                </Overlay>
            )}
            {(!isConnected || isloading) && <Loader />}
            <div className="flex flex-col grow container mx-auto">
                <div className="flex flex-row justify-between items-center text-white px-3 pt-4">
                  <div className="flex flex-row">
                  <img src="chat.png" className="w-10 mr-2"/>
                    <div className="font-semibold  text-2xl">Chattify</div>
                  </div>
                    <div
                        className="flex-row flex items-center text-sm"
                        onClick={() => {
                            logout();
                        }}
                    >
                        Logout
                        <IoMdExit size={20} className="ml-2" />
                    </div>
                </div>

                <div className=" flex grow flex-row p-2 pb-6  overflow-auto ">
                    <div
                        className={`w-full m-1 flex flex-col sm:flex sm:w-[30%]    bg-[#000000] rounded-3xl 
                         ${toUser != "" ? "hidden" : "w-full"}`}
                    >
                        <div
                            className="bg-black p-2 flex flex-row items-center border-b border-purple-400 
                                    border-opacity-30 m-3"
                        >
                            <img src="logo192.png" className="w-6" />
                            <div className="pl-3 text-sm text-white">
                                {user?.name || user?.mobile}
                            </div>
                        </div>
                        <div className={` mx-2 rounded-3xl flex  flex-col pb-1 flex-1 ${userList?.length == 0 ? 'items-center justify-center':''}`}>
                            
                            {userList?.length > 0 ? userList.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => getChatId(item)}
                                        className="my-1 py-1 px-3 flex flex-row items-center 
                                                      border border-opacity-0 border-purple-300
                                                      hover:border-opacity-20 hover:bg-white transition-all
                                                      rounded-2xl text-white hover:text-black"
                                    >
                                        <img
                                            src="logo192.png"
                                            className={`w-8 object-contain border ${item?.new ? 'border-green-500' : 'border-gray-700'}  rounded-full p-1`}
                                        />
                                        <div className="pl-3">
                                            <div className="text-sm  ">
                                                {item?.name || item?.mobile}
                                            </div>
                                            <div className={`text-xs text-gray-400 ${item?.new ? 'font-extrabold' :''}`}>
                                                {item?.message}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        :
                        <div className="text-xs text-gray-50">Lets starts your first chat.</div>
                        }
                        </div>
                        <div
                            onClick={() => setNewContactModal(true)}
                            className="static p-1.5 m-3 bg-teal-600 self-end rounded-full"
                        >
                            <IoMdAdd className="text-black " />
                        </div>
                    </div>

                    <div
                        className={`w-full flex  flex-row m-1 sm:w-[70%]  items-center justify-center  ${
                            toUser != "" ? "hidden" : ""
                        }`}
                    >
                            <img src="chat.png" className="w-10 mr-2"/>
                            <div className="text-3xl text-white"> Chattify</div>

                    </div>
                    <div
                        className={`w-full flex  flex-col m-1 sm:w-[70%] bg-[#000000]  rounded-3xl ${
                            toUser != "" ? "" : "hidden"
                        }`}
                    >
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
                                {chatHistory
                                    .concat(extendHistory)
                                    .map((item, index) => {
                                        return item?.toUser_id ==
                                            user?.user_id ? (
                                            <div className="self-start transition-all bg-white text-black px-2 py-1 rounded-r-lg rounded-b-lg my-1">
                                                {" "}
                                                {item?.message}
                                            </div>
                                        ) : (
                                            <div className="self-end transition-all  bg-green-900 bg-opacity-80 px-2 py-1 rounded-l-lg rounded-b-lg my-1">
                                                {" "}
                                                {item?.message}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="justify-between flex  flex-row items-center m-2 text-white bg-gray-900 px-5 py-3 rounded-3xl ">
                            <input
                                value={message}
                                onChange={(val) => setMessage(val.target.value)}
                                type={"text"}
                                placeholder="Message..."
                                className="bg-transparent outline-none hover:outline-none grow"
                            />
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
