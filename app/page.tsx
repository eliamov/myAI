"use client";

import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";

export default function Chat() {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    indicatorState,
    clearMessages,
  } = useApp();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-100">
      {/* Chat Header */}
      <ChatHeader clearMessages={clearMessages} />

      {/* Chat Messages Section */}
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
      />
    </div>
  );
}
