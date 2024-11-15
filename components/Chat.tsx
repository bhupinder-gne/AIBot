import { ChatProps, IHistory, IMessage, IPrompt, TabEnum } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import ResponseDisplay from "./ResponseDisplay";
import PromptForm from "./PromptForm";
import ImageGallery from "./ImageGallery";
import Drawer from "./Drawer";

export default function Chat({
  activeTab,
  isDrawerOpen,
  onDrawerOpen,
}: ChatProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [history, setHistory] = useState<IHistory[]>(
    localStorage.getItem("aiBot") != null
      ? JSON.parse(localStorage.getItem("aiBot")!)
      : []
  );

  const formatPrompt = useCallback(() => {
    return messages
      .filter((m) => m.activeTab === TabEnum.Text)
      .reduce<IPrompt[]>((prompts, m) => {
        prompts.push({ role: "user", content: m.question });
        if (m.content) prompts.push({ role: "system", content: m.content });
        return prompts;
      }, []);
  }, [messages]);

  const formatBody = useCallback(() => {
    let body;
    if (activeTab === TabEnum.Text) {
      body = { messages: formatPrompt(), activeTab };
    } else if (activeTab === TabEnum.Image) {
      body = {
        prompt: messages[messages.length - 1]?.question || "",
        numberOfImages: 5,
        activeTab,
      };
    }
    return JSON.stringify(body);
  }, [activeTab, formatPrompt, messages]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formatBody(),
      });
      return response.json();
    },
    onSuccess: (result) => {
      const lastPrompt = messages[messages.length - 1];
      lastPrompt.isPending = false;
      lastPrompt.isNewContent = true;
      if (activeTab === TabEnum.Text) {
        lastPrompt.content =
          result.choices?.[0]?.message.content || "No response";
      } else {
        lastPrompt.images = result.data;
      }
      setMessages((prev) => [...prev]);
    },
  });

  const handleSend = (message: string) => {
    setMessages((prev) => [
      ...prev,
      { question: message, isPending: true, isNewContent: false, activeTab },
    ]);
    mutation.mutate();
  };

  const handleNewChat = () => {
    if (messages.length !== 0) {
      const firstQuestion = messages[0].question;
      const existingHistory = history.find((h) => h.key === firstQuestion);
      if (existingHistory != null) {
        existingHistory.messages = messages;
        setHistory([
          existingHistory,
          ...history.filter((h) => h.key !== firstQuestion),
        ]);
        localStorage.setItem(
          "aiBot",
          JSON.stringify([
            existingHistory,
            ...history.filter((h) => h.key !== firstQuestion),
          ])
        );
      } else {
        setHistory((prev) => [{ key: firstQuestion, messages }, ...prev]);
        localStorage.setItem("aiBot", JSON.stringify([messages, ...history]));
      }
    }
    setMessages([]);
  };

  useEffect(() => {
    if (activeTab === TabEnum.Image) {
      setMessages((prev) => prev.map((m) => ({ ...m, isNewContent: false })));
    }
  }, [activeTab]);

  useEffect(() => {}, []);

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        history={history}
        handleDrawerOpen={onDrawerOpen}
        setMessages={setMessages}
      />
      {activeTab === TabEnum.Text ? (
        <ResponseDisplay messages={messages} />
      ) : (
        <ImageGallery messages={messages} />
      )}
      <PromptForm
        onSend={handleSend}
        isLoading={mutation.isPending}
        activeTab={activeTab}
        onNewChat={handleNewChat}
      />
    </>
  );
}
