import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Login } from "./screens/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Dashboard } from "./screens/Dashboard";
// log
function App() {
      const isLogin = useSelector((state) => state.userReducer.isLogin);
//sdfs
      return (
            <div className="flex h-screen bg-black">
                  <Router>
                        {isLogin ? (
                              <Routes>
                                    <Route path="/" element={<Dashboard />} />
                              </Routes>
                        ) : (
                              <Routes>
                                    <Route path="/" element={<Login />} />
                              </Routes>
                        )}
                  </Router>
                  <ToastContainer theme="dark" />
            </div>
      );
}

export default App;
