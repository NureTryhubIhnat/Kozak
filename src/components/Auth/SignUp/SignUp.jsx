// components/Signup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/auth/operations";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }

    dispatch(registerUser(email, password));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../../redux/auth/operations";
// import { setUser, setError, setLoading } from "../../../redux/auth/userSlice";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.user);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== repeatPassword) {
//       dispatch(setError("Passwords don't match."));
//       return;
//     }

//     try {
//       dispatch(setLoading());
//       const user = await registerUser(email, password);
//       dispatch(setUser(user));
//     } catch (err) {
//       dispatch(setError(err.message));
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Sign Up</h2>
//       {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
//       {status === "succeeded" && <p style={{ color: "green" }}>Registration successful! Please check your email for verification.</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-field">
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <label>Email</label>
//         </div>
//         <div className="input-field">
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <label>Password</label>
//         </div>
//         <div className="input-field">
//           <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
//           <label>Repeat Password</label>
//         </div>
//         <button className="btn" type="submit" disabled={status === "loading"}>
//           {status === "loading" ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
