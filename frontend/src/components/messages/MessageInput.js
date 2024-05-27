import React from "react";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../Context/authContext";

const MessageInput = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { selectConversation, messages, setMessages, authUser } =
    useAuthContext();
  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/messages/send/${selectConversation._id}`,
        {
          message: message, // Include the message in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
          },
        }
      );
      const data = response.data;
      console.log(data);
      setMessages([...messages, data]);
      setMessage("");
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter the message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute  inset-y-0 end-0 flex items-center pe-3 text-2xl"
          onClick={sendMessage}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <IoIosSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
