import { IMessage, TabEnum } from "@/models";
import { SparklesIcon } from "./icons";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";

export default function Message({
  question,
  content,
  isPending,
  isNewContent,
  activeTab,
  images,
}: IMessage) {
  return (
    <div className="grid grid-cols-12 gap-y-2">
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <div className="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
            <div>{question}</div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
            <SparklesIcon />
          </div>
          {!isPending ? (
            activeTab === TabEnum.Text ? (
              <TextMessage content={content!} isNewContent={isNewContent} />
            ) : (
              <ImageMessage images={images} />
            )
          ) : (
            <div className="ai-loader relative ml-3 text-sm bg-white py-2 px-4"></div>
          )}
        </div>
      </div>
    </div>
  );
}
