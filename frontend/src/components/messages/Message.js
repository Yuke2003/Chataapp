import React, { useEffect } from "react";
// import { useState } from "react";
import { useAuthContext } from "../../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { extractTime } from "./ExactTime";

const Message = ({ message }) => {
  const { setMessages, selectConversation, authUser} =
    useAuthContext();
  const fromMe = message.senderId === authUser.data.user._id;
  // console.log(message.senderId)
  // // console.log(authUser._id)
  // console.log(authUser)

  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""

  useEffect(() => {
    const getMessages = async () => {
     
      try {
        const response = await axios.get(
          `http://localhost:8000/api/messages/${selectConversation?._id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
            },
          }
        );
        const data = response.data;
        setMessages(data)
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    if (selectConversation?._id) getMessages();
  }, [selectConversation?._id,authUser,setMessages]);

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </>
  );
};

export default Message;
