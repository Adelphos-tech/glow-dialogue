import React, { useState } from "react";
import { ArrowUp } from "lucide-react";

type ChatInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl px-4 pb-6"
      aria-label="chat input"
    >
      <div className="flex items-center gap-3 rounded-full border border-border bg-accent/50 backdrop-blur px-4 py-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything"
          className="min-w-0 flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="message"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex shrink-0 rounded-full bg-primary text-primary-foreground p-2 disabled:opacity-50"
          aria-label="send"
          title="Send"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
