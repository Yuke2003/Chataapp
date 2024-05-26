import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/authContext";

const Conversations = () => {
  const { authUser, selectUsers, setSelectUsers ,setSelectConversation } = useAuthContext();

  // const isSelected = selectConversation?._id === selectUsers._id;

  useEffect(() => {
    const getConversation = async () => {
      
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
          },
        });
        const data = response.data;
        setSelectUsers(data);

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        
      }
    };
    getConversation();
  }, [authUser, setSelectUsers]);
  return (
    <ul>
      {selectUsers.map((Item, index) => (
        <li key={Item._id} onClick={()=>setSelectConversation(selectUsers[index])}>
          <div className={`flex items-center gap-3 hover:bg-blue-500 rounded p-2 py-1 cursor-pointer `}>
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img
                  src={
                    Item.gender === "male"
                      ? `https://xsgames.co/randomusers/assets/avatars/male/${index}.jpg`
                      : `https://xsgames.co/randomusers/assets/avatars/female/${index}.jpg`
                  }
                  alt="user avatar"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-gray-200">{Item.fullName}</p>
                <span className="text-xl">🔥</span>
              </div>
            </div>
          </div>
          <div className="divider m-0 p-0 h-1"></div>
        </li>
      ))}
    </ul>
  );
};

export default Conversations;
