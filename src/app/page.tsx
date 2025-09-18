'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-4">
      <h1 className="text-2xl font-semibold">AI Chatbot</h1>
      <div className="w-full max-w-xl flex-1 overflow-y-auto border rounded p-4 space-y-3">
        {messages.map(message => (
          <div key={message.id} className="whitespace-pre-wrap">
            <span className="font-medium">{message.role === 'user' ? 'You: ' : 'AI: '}</span>
            {message.parts.map((part, index) =>
              part.type === 'text' ? <span key={index}>{part.text}</span> : null,
            )}
          </div>
        ))}
        {status === "streaming" && <div className="text-sm text-gray-500">Thinking…</div>}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
        className="w-full max-w-xl flex gap-2"
      >
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button 
          type="submit" 
          disabled={status !== 'ready'}
          className="border rounded px-4 disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
