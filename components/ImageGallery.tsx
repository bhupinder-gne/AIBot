import { ImageGalleryProps, TabEnum } from "@/models";
import Message from "./Message";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

const ImageGallery = ({ messages }: ImageGalleryProps) => {
  const chatBoxRef = useScrollToBottom(messages);

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4" ref={chatBoxRef}>
      <div className="flex flex-col h-full">
        {messages
          .filter((m) => m.activeTab === TabEnum.Image)
          .map((message, idx) => (
            <Message key={idx} {...message} />
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
