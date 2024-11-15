import { IMessage } from "@/models";
import { useEffect, useRef } from "react";

export function useScrollToBottom(messages: IMessage[]) {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return chatBoxRef;
}
