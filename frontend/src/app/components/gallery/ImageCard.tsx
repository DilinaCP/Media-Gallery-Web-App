"use client";

import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { X } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <ImageSlider
        onPrev={onPrev}
        onNext={onNext}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />

      <div className="text-center max-w-5xl w-full">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
          <div className="overflow-hidden rounded-xl mb-6">
            <img
              src={image.url}
              alt={formatName(image)}
              className="max-h-[70vh] max-w-full mx-auto rounded-lg object-contain"
            />
          </div>
          <h2 className="text-white text-2xl font-bold">
            {formatName(image)}
          </h2>
          <p className="text-slate-400 text-sm mt-3 flex items-center justify-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
            {mounted ? formatDate(image) : ""}
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
          </p>
        </div>
      </div>
    </div>
  );
}