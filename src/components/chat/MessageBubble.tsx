import React from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === "user";
  const hasMultipleHeadings =
    !isUser && (content.match(/(^|\n)#{1,6}\s/g) || []).length > 1;
  const Container = (hasMultipleHeadings ? "section" : "div") as keyof JSX.IntrinsicElements;
  return (
    <article
      className={cn(
        "w-full flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <Container
        className={cn(
          "max-w-[72ch] rounded-2xl border px-4 py-3 text-sm leading-6 shadow-sm backdrop-blur",
          isUser
            ? "bg-secondary border-border text-foreground"
            : "bg-accent border-border text-foreground"
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            strong: ({ node, ...props }) => (
              <strong {...props} className="font-bold" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-5 space-y-1" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal pl-5 space-y-1" />
            ),
            li: ({ node, ...props }) => <li {...props} className="[&>p]:inline" />,
            p: ({ node, ...props }) => <p {...props} className="mb-2" />,
            code: ({ className, children, ...props }) => (
              <code
                className={cn("rounded bg-muted px-1.5 py-0.5", className)}
                {...props}
              >
                {children}
              </code>
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="mt-2 rounded-md"
                loading="lazy"
                alt={(props.alt as string) || "image"}
              />
            ),
            h1: ({ node, ...props }) => (
              <h3 {...props} className="text-base font-bold" />
            ),
            h2: ({ node, ...props }) => (
              <h4 {...props} className="text-sm font-bold" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Container>
    </article>
  );
};

export default MessageBubble;
