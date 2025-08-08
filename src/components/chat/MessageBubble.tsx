import React from "react";
import { cn } from "@/lib/utils";

export type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <article
      className={cn(
        "w-full flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[72ch] rounded-2xl border px-4 py-3 text-sm leading-6 shadow-sm backdrop-blur",
          isUser
            ? "bg-secondary border-border text-foreground"
            : "bg-accent border-border text-foreground"
        )}
      >
        {content}
      </div>
    </article>
  );
};

export default MessageBubble;
