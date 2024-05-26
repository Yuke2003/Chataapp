import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useAuthContext } from "../../Context/authContext";

const Messages = () => {
  const { messages, loading } = useAuthContext();
  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
  return (

    <div className="px-4 flex-1 overflow-auto">
      {/* <Message /> */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div> 
        ))} 

      {!loading && messages.length === 0 && (
        <div className="text-center">
          Send a message to start the conversation
        </div>
      )}

      {/* <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> */}
    </div>
  );
};

export default Messages;
