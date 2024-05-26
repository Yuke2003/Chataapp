import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import uselogout from "../pages/login/logout";

const LogoutButton = () => {
  const { loading, logout } = uselogout();
  return (
    <>
    {!loading ? (
          <div className="mt-auto w-6 h-6 cursor-pointer" onClick={logout}>
          <RiLogoutBoxLine />
        </div>
    ):(
      <span className="loading loading-spinner "></span>
    )}
    </>
  );
}; 

export default LogoutButton;
