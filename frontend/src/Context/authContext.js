import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-info")) || null
  );
  const [selectUsers, setSelectUsers] = useState([]);
  const [selectConversation,setSelectConversation] = useState(null)
  const [messages, setMessages] = useState([]);
  const [loading,setLoading] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        selectUsers,
        setSelectUsers,
        messages,
        setMessages,
        selectConversation,
        setSelectConversation,
        loading,setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
