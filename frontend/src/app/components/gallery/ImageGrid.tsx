"use client";

type ImageItem = {
  _id?: string;
  url: string;
  publicId?: string;
  createdAt?: string;
};

interface Props {
  images: ImageItem[];
  onImageClick: (index: number) => void;
}

const formatName = (img: ImageItem) => img.publicId?.split("/").pop() ?? "Image";

export default function ImageGrid({ images, onImageClick }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {images.map((img, index) => (
        <div
          key={img._id ?? index}
          onClick={() => onImageClick(index)}
          className="cursor-pointer bg-white rounded-lg shadow p-2 hover:scale-105 transition"
        >
          <img
            src={img.url}
            alt={formatName(img)}
            className="w-full h-40 object-cover rounded"
          />
          <p className="mt-2 text-sm font-medium text-center">
            {formatName(img)}
          </p>
        </div>
      ))}
    </div>
  );
}