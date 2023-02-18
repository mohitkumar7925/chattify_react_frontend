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
      const [name, setName] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [loginTab, setLoginTab] = useState(true);

      const dispatch = useDispatch();

      const onSubmit = async () => {
            if (mobile != "" && password != "" && (loginTab || name != '' )) {
                  try {
                        setIsLoading(true);
                        let res = await Axios.post(loginTab ? "login" : 'signup', {
                              mobile,
                              password,
                              name
                        });
                        setIsLoading(false);
                        console.log(res.data);
                        if (res.data?.status) {
                              dispatch(login_status(true));
                              localStorage.setItem("user", JSON.stringify(res.data.data));
                              console.log("saved user ", res.data.data);

                              toast(res?.data?.message);
                        } else {
                              dispatch(login_status(false));
                              toast(res?.data?.message, { type: "error" });
                        }
                  } catch (error) {
                        dispatch(login_status(false));
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
            <div className=" flex flex-col flex-1"
             style={{ backgroundImage: `linear-gradient(rgba(135, 80, 156, 0.2), rgba(135, 80, 156, 0.3)), url(login_back.jpg)` }}
             >
                  <div className="p-10 bg-black m-auto rounded-xl mt-[10%] flex flex-col gap-3 z-10 md:w-[400px]">
                        <h4 className=" font-semibold text-2xl mb-2 text-white">Login</h4>
                        {!loginTab && <TextInput placeholder="Name" value={name} onChange={(val) => setName(val.target.value)} />}
                        <TextInput
                              placeholder="Mobile Number"
                              value={mobile}
                              onChange={(val) => {
                                    setMobile(val.target.value);
                              }}
                        />
                        <TextInput placeholder="Password" type="password" value={password} onChange={(val) => setPassword(val.target.value)} />

                        <Button
                              onClick={() => {

                                          onSubmit();
                                   
                              }}
                              className="mt-5"
                        >
                              {loginTab ? "Login" : "Signup"}
                        </Button>
                        <div className="text-gray-300 text-sm text-center">OR</div>
                        <Button
                              outline={true}
                              onClick={() => {
                                    if (loginTab) {
                                          setLoginTab(false);
                                    } else {
                                          setLoginTab(true);
                                    }
                              }}
                              className="mt-0"
                        >
                              {!loginTab ? "Login" : "Signup"}
                        </Button>
                  </div>
                  {isLoading && <Loader />}
            </div>
      );
};
