import React, { useEffect, useContext, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import { Routes, Route, useNavigate } from "react-router";
import axios from "./utils/axiosConfig";
import { Context } from "./components/Context/Context";
import { Type } from "./utils/action.type";
import ProtectedRoute from "./ProtectedRoute";


function Router() {
 
  const [{ user }, dispatch] = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await checkUser();
   
    })();
  }, []);

  async function checkUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const user_id = localStorage.getItem("user_id");
    if (!token || !username || !user_id) {
      dispatch({ type: Type.SET_USER, user: null });
      navigate("/");
      return;
    }
    try {
      const res = await axios.get("/user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: Type.SET_USER,
        user: res?.data?.user || null,
      });
    } catch (error) {
      console.error(error?.response?.data || error.message);
      dispatch({ type: Type.SET_USER, user: null });
      navigate("/");
   
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Auth />} />
       
    
       
       
      </Routes>
      <Footer />
    </>
  );
}

export default Router;
