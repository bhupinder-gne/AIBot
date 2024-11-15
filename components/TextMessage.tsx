import { TextMessageProps } from "@/models";
import { motion } from "framer-motion";

export default function TextMessage({
  content,
  isNewContent,
}: TextMessageProps) {
  return (
    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
      {isNewContent ? (
        <motion.div
          className="w-full mx-auto max-w-3xl px-4 group/message"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </div>
  );
}
