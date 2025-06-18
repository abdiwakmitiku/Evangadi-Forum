import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../../utils/axiosConfig";
import { Type } from "../../utils/action.type";
import { Context } from "../../components/Context/Context";

function Auth() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [{ user }, dispatch] = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);

  //SignUp
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  //Login
  const emailLoginDom = useRef(null);
  const passwordLoginDom = useRef(null);


  //Signup Submit Handler
  async function SignUpSubmit(e) {
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
      setError("Please Provide All Required Fields!");
      return;
    }
    try {
      setError(null);
      await axios.post("/user/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });
      setIsLogin((prev) => !prev);
      //   alert("Register Success");
      //   navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    }
  }

  //Login Submit Handler
  async function LogInSubmit(e) {
    e.preventDefault();

    const emailValue = emailLoginDom.current.value;
    const passwordValue = passwordLoginDom.current.value;
    if (!emailValue || !passwordValue) {
      setError("Please Provide All Required Fields!");
      return;
    }
    try {
      setError(null);
      const { data } = await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });
      const token = data.token;
      const username = data.user.username;
      const user_id = data.user.user_id;
      // console.log(data);
      //   alert("Login Successful");
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", user_id);

      const response = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const userInfo = response.data.user;
      await dispatch({
        type: Type.SET_USER,
        user: userInfo,
      });
      navigate("/home");

      //   navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
      // console.log(error.response.data.message);
    }
  }

  function toggler(e) {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  }

  return (
    <>
      {/* Login */}
      <section>
        {isLogin ? (
          <div>
            <h3>Login to your account</h3>
            <p>
              Don’t have an account?{" "}
              <a href="#" onClick={toggler}>
                Create a new account
              </a>
            </p>

            <form onSubmit={LogInSubmit}>
              <div>
                <span>Email :---</span>
                <input ref={emailLoginDom} type="email" placeholder="Email" />
              </div>
              <br />
              <div>
                <span>Password :---</span>
                <input
                  ref={passwordLoginDom}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit">Login</button>
            </form>

            <Link to={"/register"}>Register</Link>
          </div>
        ) : (
          /* SignUp */
          <div>
            <h3>Create account</h3>
            <p>
              Already have an account?{" "}
              <Link href="#" onClick={toggler}>
                Sign in{" "}
              </Link>
            </p>

            <form onSubmit={SignUpSubmit}>
              <div>
                <span>username :---</span>
                <input ref={userNameDom} type="text" placeholder="username" />
              </div>
              <br />
              <div>
                <span>First Name :---</span>
                <input
                  ref={firstNameDom}
                  type="text"
                  placeholder="First Name"
                />
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
                <input
                  ref={passwordDom}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <Link to={"/login"}>Login</Link>
          </div>
        )}
      </section>
      <section>
              <p>About</p>
              <h1>Evangadi Networks Q&A</h1>
              <p>
                No matter what stage of life you are in, whether you’re just starting
                elementary school or being promoted to CEO of a Fortune 500 company,
                you have much to offer to those who are trying to follow in your
                footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
              <Link to="/how">
                <button>HOW IT WORKS</button>
              </Link>
            </section>
    </>
  );
}

export default Auth;
