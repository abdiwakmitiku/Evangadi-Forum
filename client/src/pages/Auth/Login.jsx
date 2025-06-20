import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("Please Provide All Required Fields!");
      return;
    }
    try {
      const { data } = await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });
      console.log(data);
      alert("Login Successfull");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
      // console.log(error.response.data.message);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to={"/auth/register"}>Register</Link>
    </section>
  );
}

export default Login;
