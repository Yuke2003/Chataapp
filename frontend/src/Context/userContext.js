// import { createContext, useContext, useState } from "react";

// export const Context = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const [userAuth, setAuthUser] = useState(
//     JSON.parse(localStorage.getItem("user-token")) || null
//   );

//   return (
//     <AuthContext.Provider value={{ userAuth, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
