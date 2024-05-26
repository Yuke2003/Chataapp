import Login from "./../src/pages/login/login";
import Signup from "./../src/pages/signup/signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./../src/pages/home/home";
import { useAuthContext } from "./Context/authContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> :<Navigate to="/login" />} />
          <Route path="/Login" element={authUser ? <Navigate to="/" /> :<Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
