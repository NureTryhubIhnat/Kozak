// components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/auth/operations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../redux/auth/operations";

// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { status, error } = useSelector((state) => state.user);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       {status === "loading" && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-field">
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
//         </div>
//         <div className="input-field">
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
//         </div>
//         <button className="btn" type="submit" disabled={status === "loading"}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
