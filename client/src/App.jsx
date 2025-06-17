import React, { useEffect, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "./utils/axiosConfig";



export const AppState = createContext()

function App() {
  const [user, setUser] = useState({})
const token = localStorage.getItem('token')
const navigate = useNavigate()
  async function checkUser() {
    try {
     const {data} = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
setUser(data)
      // console.log(data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
  if (token) {
    checkUser();
  } else {
    navigate("/login");
  }
}, []);



  return (
    <AppState.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />

      </Routes>
    </AppState.Provider>
  );
}

export default App;

