// import React, { useRef, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../../utils/axiosConfig";
// import { Type } from "../../utils/action.type";
// import { DataContext } from "../../components/DataProvider/DataProvider";

// function Auth() {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // Form refs
//   const loginFormRef = useRef({
//     email: useRef(null),
//     password: useRef(null),
//   });

//   const registerFormRef = useRef({
//     username: useRef(null),
//     firstName: useRef(null),
//     lastName: useRef(null),
//     email: useRef(null),
//     password: useRef(null),
//   });

//   const toggleAuthMode = (e) => {
//     e.preventDefault();
//     setIsLogin(!isLogin);
//     setError(null);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { username, firstName, lastName, email, password } =
//       registerFormRef.current;

//     const values = {
//       username: username.current.value,
//       firstname: firstName.current.value,
//       lastname: lastName.current.value,
//       email: email.current.value,
//       password: password.current.value,
//     };

//     if (Object.values(values).some((val) => !val)) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       await axios.post("/user/register", values);
//       setIsLogin(true); // Switch to login after registration
//     } catch (error) {
//       setError(error?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const { email, password } = loginFormRef.current;
//     const values = {
//       email: email.current.value,
//       password: password.current.value,
//     };

//     if (!values.email || !values.password) {
//       setError("Please provide email and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await axios.post("/user/login", values);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.user.username);
//       localStorage.setItem("user_id", data.user.user_id);

//       const response = await axios.get("/user/check", {
//         headers: { Authorization: `Bearer ${data.token}` },
//       });

//       dispatch({
//         type: Type.SET_USER,
//         user: response.data.user,
//       });

//       navigate("/");
//     } catch (error) {
//       setError(error?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <section>
//         {isLogin ? (
//           <div>
//             <h3>Login to your account</h3>
//             <p>
//               Don't have an account?{" "}
//               <Link to="#" onClick={toggleAuthMode}>
//                 Create a new account
//               </Link>
//             </p>

//             {error && <div>{error}</div>}

//             <form onSubmit={handleLogin}>
//               <div>
//                 <label>Email</label>
//                 <input
//                   ref={loginFormRef.current.email}
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               <div >
//                 <label>Password</label>
//                 <input
//                   ref={loginFormRef.current.password}
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <button type="submit" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div>
//             <div>
//               {/* Left form card */}
//               <div>
//                 <h3>Join the network</h3>
//                 <p>
//                   Already have an account?{" "}
//                   <Link to="#" onClick={toggleAuthMode}>
//                     Sign in
//                   </Link>
//                 </p>

//                 {error && <div>{error}</div>}

//                 <form onSubmit={handleRegister}>
//                   <input
//                     ref={registerFormRef.current.email}
//                     type="email"
//                     placeholder="Email"
//                   />
//                   <div>
//                     <input
//                       ref={registerFormRef.current.firstName}
//                       type="text"
//                       placeholder="First Name"
//                     />
//                     <input
//                       ref={registerFormRef.current.lastName}
//                       type="text"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                   <input
//                     ref={registerFormRef.current.username}
//                     type="text"
//                     placeholder="User Name"
//                   />
//                   <input
//                     ref={registerFormRef.current.password}
//                     type="password"
//                     placeholder="Password"
//                   />
//                   <button type="submit">Agree and Join</button>
//                 </form>

//                 <p>
//                   I agree to the <Link to="#">privacy policy</Link> and{" "}
//                   <Link to="#">terms of service</Link>.
//                 </p>
//                 <p>
//                   Already have an account?{" "}
//                   <button onClick={toggleAuthMode}>
//                     Sign in
//                   </button>
//                 </p>
//               </div>

//               {/* Right Info */}
//               <div>
//                 <h1>Evangadi Networks Q&A</h1>
//                 <p>Lorem ipsum dolor sit amet, consectetur...</p>
//                 <button >HOW IT WORKS</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       <section>
//         <h1>Evangadi Networks Q&A</h1>
//         <p>
//           No matter what stage of life you are in, whether you're just starting
//           elementary school or being promoted to CEO of a Fortune 500 company,
//           you have much to offer to those who are trying to follow in your
//           footsteps.
//         </p>
//         <Link to="/how">
//           HOW IT WORKS
//         </Link>
//       </section>
//     </div>
//   );
// }

// export default Auth;
