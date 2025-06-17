import React, { useRef } from "react";
import {Link, useNavigate} from "react-router"
import axios from "../utils/axiosConfig";

function Register() {
  const navigate = useNavigate()
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please Provide All Required Fields!");
      return;
    }
    try {
      await axios.post("/user/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Register Success")
      navigate("/login")
    } catch (error) {
        alert(error?.response?.data?.message)
      console.log(error.response.data.message);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username :---</span>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First Name :---</span>
          <input ref={firstNameDom} type="text" placeholder="First Name" />
        </div>
        <br />
        <div>
          <span>Last Name :---</span>
          <input ref={lastNameDom} type="text" placeholder="Last Name" />
        </div>
        <br />
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </section>
  );
}

export default Register;
