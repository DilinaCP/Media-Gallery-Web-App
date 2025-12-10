"use client";

interface Props {
  images: any[];
  onImageClick: (index: number) => void;
}

export default function ImageGrid({ images, onImageClick }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {images.map((img, index) => (
        <div
          key={img.id}
          onClick={() => onImageClick(index)}
          className="cursor-pointer bg-white rounded-lg shadow p-2 hover:scale-105 transition"
        >
          <img
            src={img.url}
            alt={img.name}
            className="w-full h-40 object-cover rounded"
          />
          <p className="mt-2 text-sm font-medium text-center">
            {img.name}
          </p>
        </div>
      ))}
    </div>
  );
}
