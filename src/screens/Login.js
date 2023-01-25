import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { TextInput } from "../components/TextInput";
import { login_status } from "../store/reducers/userReducer";
import { Axios } from "../utils/Axios";

export const Login = () => {
      const [mobile, setMobile] = useState("");
      const [password, setPassword] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      const dispatch = useDispatch();

      const onSubmit = async () => {
            
            if (mobile != "" && password != "") {
                  try {
                        setIsLoading(true);
                        let res = await Axios.post("login", {
                              mobile,
                              password,
                        });
                        setIsLoading(false);
                        console.log(res.data);
                        if (res.data?.status) {
                              dispatch(login_status(true))
                              localStorage.setItem("user", JSON.stringify(res.data.data));
                              console.log('saved user ',res.data.data);
                              
                              toast(res?.data?.message);
                              
                        } else {
                            dispatch(login_status(false))
                              toast(res?.data?.message, { type: "error" });
                        }
                  } catch (error) {
                    dispatch(login_status(false))
                        setIsLoading(false);
                        console.log(error);
                        toast(error?.toString(), { type: "error" });
                  }
            } else {
                  toast("Please enter all the details", { type: "warning" });
            }
            // Axios.post("login", {});
      };

      return (
            <div className=" h-screen flex flex-col " style={{ backgroundImage: `linear-gradient(rgba(135, 80, 156, 0.2), rgba(135, 80, 156, 0.3)), url(login_back.jpg)` }}>
                  <div className="p-10 bg-black m-auto rounded-xl mt-[10%] flex flex-col gap-5  z-10 md:w-[400px]">
                        <h4 className=" font-semibold text-2xl text-white">Login</h4>
                        <TextInput
                              placeholder="Mobile Number"
                              value={mobile}
                              onChange={(val) => {
                                    setMobile(val.target.value);
                              }}
                        />
                        <TextInput placeholder="Password" value={password} onChange={(val) => setPassword(val.target.value)} />

                        <Button
                              onClick={() => {
                                    console.log(".....");
                                    onSubmit();
                              }}
                        >
                              Login
                        </Button>
                  </div>
                  {isLoading && <Loader />}
            </div>
      );
};
