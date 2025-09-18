"use client";

import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-4">
      <h1 className="text-2xl font-semibold">Simple Chatbot</h1>
      <div className="w-full max-w-xl flex-1 overflow-y-auto border rounded p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <span className="font-medium">{m.role === "user" ? "You:" : "AI:"} </span>
            {m.parts.map((part, i) => {
              if (part.type === "text") return <span key={`${m.id}-${i}`}>{part.text}</span>;
              return null;
            })}
          </div>
        ))}
        {isLoading ? <div className="text-sm text-gray-500">Thinking…</div> : null}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          placeholder="Say something…"
          onChange={handleInputChange}
        />
        <button type="submit" className="border rounded px-4">Send</button>
      </form>
    </div>
  );
}
