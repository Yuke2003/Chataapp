import React, { useState } from "react";
import GenderCheck from "./GenderCheck";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/authContext";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const checkBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        inputs
      );
      toast.success(" Signup Successfully ");
      navigate("/login");
      setAuthUser(response.data);
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(error.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from the server!");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        toast.error("An error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">fullName</span>
            </label>
            <input
              type="text"
              placeholder="Enter fullName"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">ConfirmPassword</span>
            </label>
            <input
              type="password"
              placeholder="Enter ConfirmPassword"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheck
            onCheckBox={checkBoxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            className="text-sm text-gray-200 hover:text-blue-500 underline  "
          >
            Already have an account
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-8">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// STATER code
// import React from "react";
// import GenderCheck from "./GenderCheck";
// import { Link } from "react-router-dom";

// const signup = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           Sign Up <span className="text-blue-500">ChatApp</span>
//         </h1>
//         <form>

//         <div>
//             <label className="label p-2">
//               <span className="text-base label-text">fullName</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter fullName"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Email</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Email"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">ConfirmPassword</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter ConfirmPassword"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <GenderCheck />
//           <Link to="/login" className="text-sm text-gray-200 hover:text-blue-500 underline  ">Already have an account</Link>

//           <div>
//             <button className="btn btn-block btn-sm mt-8">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default signup
