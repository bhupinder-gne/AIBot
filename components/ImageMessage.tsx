import { ImageMessageProps } from "@/models";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

export default function ImageMessage({ images }: ImageMessageProps) {
  return (
    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
      <div className="flex flex-wrap gap-3 justify-center">
        {images?.map((image, index) => (
          <div
            key={index}
            className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group"
          >
            <Image
              src={`data:image/png;base64,${image.b64_json}`}
              width={512}
              height={512}
              alt={`Generated Image ${index + 1}`}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAABCAYAAACouxZ2AAAAG0lEQVR42u3BAQEAAAgCIFvedBsSMG02AMArB/ajAn/K8QyYAAAAAElFTkSuQmCC"
              className="object-cover w-full h-full group-hover:blur-0 transition duration-300"
            />
            <a
              href={`data:image/png;base64,${image.b64_json}`}
              download={`Generated Image ${index + 1}`}
              className="absolute cursor-pointer bottom-2 right-2 opacity-0 group-hover:opacity-100 bg-white text-black px-2 py-1 rounded transition duration-300"
            >
              <FiDownload size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
