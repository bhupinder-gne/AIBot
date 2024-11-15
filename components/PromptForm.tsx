import { useState } from "react";
import { PromptFormProps, TabEnum } from "@/models";
import { FaPlus } from "react-icons/fa";

export default function PromptForm({
  onSend,
  isLoading,
  activeTab,
  onNewChat,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSend(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="flex items-center pt-0">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full space-x-2"
      >
        <FaPlus size={18} className="cursor-pointer" onClick={onNewChat} />
        <input
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          placeholder={
            activeTab === TabEnum.Text
              ? "Ask me something"
              : "Ask me to generate image"
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}
