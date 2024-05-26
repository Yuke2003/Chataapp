import React, { useEffect } from "react";
// import Headers from "./Headers";
import { TiMessages } from "react-icons/ti";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../Context/authContext";

const MessageContainer = () => {
  const { selectConversation, setSelectConversation } = useAuthContext();

  useEffect(() => {
    return () => setSelectConversation(null);
  }, [setSelectConversation]);

  return (
    <div className=" md:min-w-[450px] flex flex-col">
      {!selectConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* <Headers /> */}
          <div className="px-4 py-2 bg-slate-500 mb-2">
            <span className="text-label">To:</span>
            <span className="text-gray-900 font-bold">
              {selectConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋{authUser.data.user.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
