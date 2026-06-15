import { VideoTrailerInterface } from "@/models/Movies/VideoMedia.type";
import { Video } from "./Video";
import Image from "next/image";

type props = {
  video: VideoTrailerInterface;
};

export function VideoThumbnail({ video }: props) {
  const videoThumbnail = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

  return (
    <Video video={video}>
      {(props) => (
        <>
          <button
            {...props}
            className="relative w-[80vw] max-w-[450px] aspect-[16/9]"
          >
            <Image
              src={videoThumbnail}
              alt={`${video.name} thumbnail`}
              fill
              className="rounded-lg hover:brightness-50"
            />
            <div className="absolute flex justify-center items-center gap-[5px] top-0 left-0 w-full h-full z-[1] cursor-pointer hover:text-[whitesmoke]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[25%] h-[25%] transition-colors duration-350"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
            </div>
          </button>
          <small className="block w-[80vw] max-w-[450px] whitespace-nowrap overflow-hidden text-ellipsis font-bold">
            {video.name}
          </small>
        </>
      )}
    </Video>
  );
}
