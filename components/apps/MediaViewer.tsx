"use client";

export default function MediaViewerApp({ image }: { image: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex justify-center items-center bg-darkSlateBlue">
        <img
          src={image}
          alt="Media Viewer"
          className="max-w-full max-h-full rounded shadow-lg"
        />
      </div>
    </div>
  );
}
