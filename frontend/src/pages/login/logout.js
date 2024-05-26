import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../Context/authContext";
import toast from "react-hot-toast";

const uselogout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout"
      );
      const data = response.data;
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user-info");
      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  return {loading,logout};
};

export default uselogout;
