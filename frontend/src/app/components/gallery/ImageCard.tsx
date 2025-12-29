"use client";

import ImageSlider from "./ImageSlider";

type ImageItem = {
  url: string;
  publicId?: string;
  createdAt?: string;
  name?: string;
};

interface Props {
  image: ImageItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const formatName = (img: ImageItem) =>
  img.name?.trim() || img.publicId?.split("/").pop() || "Image";
const formatDate = (img: ImageItem) =>
  img.createdAt ? new Date(img.createdAt).toLocaleDateString() : "";

export default function ImageCard({
  image,
  onClose,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: Props) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
      >
        ✕
      </button>

      <ImageSlider
        onPrev={onPrev}
        onNext={onNext}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />

      <div className="text-center max-w-5xl px-6 w-full">
        <img
          src={image.url}
          alt={formatName(image)}
          className="max-h-[80vh] max-w-full mx-auto rounded-lg shadow-2xl object-contain"
        />
        <h2 className="text-white text-xl font-semibold mt-4">
          {formatName(image)}
        </h2>
        <p className="text-gray-300 mt-2">{formatDate(image)}</p>
      </div>
    </div>
  );
}