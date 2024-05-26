import React from "react";
import SearchInput from "./SearchInput";
import Conversation from "./Conversation";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="p-4 border-r border-slate-500 flex flex-col">
      <SearchInput />
      <div className="divider p-3"></div>
      <Conversation />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
