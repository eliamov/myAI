import { useState, useEffect, useRef } from "react";
import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function AILogo() {
  return (
    <div className="w-9 h-9">
      <Image src="/ai-logo.png" alt={AI_NAME} width={36} height={36} />
    </div>
  );
}

function UserMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 bg-blue-500 rounded-2xl text-white max-w-[60%] shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {message.content}
      </motion.div>
    </motion.div>
  );
}

function AssistantMessage({
  message,
  onSaveMessage,
}: {
  message: DisplayMessage;
  onSaveMessage: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start gap-[5px]"
    >
      <div className="w-9 flex items-end">{<AILogo />}</div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 bg-gray-200 rounded-2xl text-black max-w-[60%] shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <Formatting message={message} />
        <Button
          onClick={onSaveMessage}
          size="sm"
          className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
        >
          Save
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function ChatMessages({
  messages,
  indicatorState,
}: {
  messages: DisplayMessage[];
  indicatorState: LoadingIndicator[];
}) {
  const [savedMessages, setSavedMessages] = useState<DisplayMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const showLoading =
    indicatorState.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  const handleSaveMessage = (message: DisplayMessage) => {
    setSavedMessages((prev) => [...prev, message]);
  };

  const handleRemoveMessage = (index: number) => {
    setSavedMessages((prev) => prev.filter((_, i) => i !== index));
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      {/* Chat Messages Section (Scrollable and Full Height) */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header (Fixed at the Top) */}
        <div className="h-[60px] bg-white shadow-md fixed top-0 w-full z-10 flex items-center justify-center">
          <h2 className="text-lg font-bold">Chat</h2>
        </div>

        {/* Chat Scrollable Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 mt-[60px] mb-[70px]" // Ensures space for header & input
        >
          {messages.length === 0 ? (
            <div className="flex flex-col flex-1 justify-center items-center text-gray-500">
              Ask a question to start the conversation
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {message.role === "user" ? (
                  <UserMessage message={message} />
                ) : (
                  <AssistantMessage
                    message={message}
                    onSaveMessage={() => handleSaveMessage(message)}
                  />
                )}
              </motion.div>
            ))
          )}
          {showLoading && <Loading indicatorState={indicatorState} />}
        </div>

        {/* Chat Input (Fixed at the Bottom) */}
        <div className="h-[70px] bg-white shadow-md fixed bottom-0 w-full z-10 flex items-center justify-center px-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full max-w-screen-md px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
          />
          <Button className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</Button>
        </div>
      </div>

      {/* Sidebar for Saved Messages (Fixed Right, Full Height) */}
      <div className="w-[320px] h-screen bg-gray-100 p-4 border-l shadow-md overflow-y-auto fixed right-0 top-0">
        <h2 className="text-lg font-bold mb-2">Saved Messages</h2>
        {savedMessages.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved messages.</p>
        ) : (
          savedMessages.map((msg, index) => (
            <div key={index} className="p-2 border-b flex justify-between items-center">
              <p className="text-sm">{msg.content}</p>
              <Button
                onClick={() => handleRemoveMessage(index)}
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
