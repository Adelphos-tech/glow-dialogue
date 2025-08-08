import { useEffect, useMemo, useRef, useState } from "react";
import Halo from "@/components/ambient/Halo";
import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";

const WEBHOOK_URL = "https://demoverison1.app.n8n.cloud/webhook/59688087-8e7a-4476-a549-16070fb38c99";

type Msg = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // SEO basics
  useEffect(() => {
    document.title = "AI Chat Interface — Ask Anything Fast";
    const desc = "Beautiful gradient AI chat interface. Ask anything and get instant answers.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.href);
    if (!canonical.parentElement) document.head.appendChild(canonical);
  }, []);

  useEffect(() => {
    const smooth = { behavior: "smooth" as ScrollBehavior };
    endRef.current?.scrollIntoView(smooth);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text }),
      });
      const data = await res.json();
      const output = typeof data === "object" && data !== null && "output" in data ? String((data as any).output ?? "") : "";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: output || "" },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = useMemo(() => messages.length === 0, [messages.length]);

  return (
    <div className="relative min-h-screen text-foreground">
      <Halo />
      <header className="sticky top-0 z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div className="text-sm text-muted-foreground">Nova</div>
        <div>
          <a
            href="#"
            className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-foreground hover:bg-accent transition"
          >
            Try Pro
          </a>
        </div>
      </header>

      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col gap-6 px-4 pt-10 pb-40">
        {isEmpty ? (
          <section className="pt-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Ask anything</h1>
            <p className="mt-3 text-muted-foreground">
              Fast, helpful answers with built-in reasoning.
            </p>
          </section>
        ) : (
          <section className="space-y-4" ref={listRef}>
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <MessageBubble role="assistant" content="Thinking…" />
            )}
          </section>
        )}
        <div ref={endRef} aria-hidden className="h-1" />
      </main>

      <nav className="fixed inset-x-0 bottom-0">
        <ChatInput onSend={handleSend} disabled={loading} />
        <p className="pb-6 text-center text-xs text-muted-foreground">
          Powered by your private workflow
        </p>
      </nav>
    </div>
  );
};

export default Index;
