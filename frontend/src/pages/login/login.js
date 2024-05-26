import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password }
      );
      const data = response.data;
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
      toast.success("login successfully");

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          login <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-white text-sm  hover:text-blue-500 underline mt-2 inline-block"
          >
            Dont have an account ?
          </Link>
          <div>
          <button className="btn btn-block btn-sm mt-8">{loading ? <div className="loading loading-spinner"></div> :"Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

//starter code
// const login = () => {
//     return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
//           <h1 className="text-3xl font-semibold text-center text-gray-300">
//             login <span className="text-blue-500">ChatApp</span>
//           </h1>
//           <form>
//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Username</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Username"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>

//             <div>
//               <label className="label p-2">
//                 <span className="text-base label-text">Password</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Password"
//                 className="w-full input input-bordered h-10"
//               />
//             </div>

//             <div>
//               <button className="btn btn-block btn-sm mt-8">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   export default login;
