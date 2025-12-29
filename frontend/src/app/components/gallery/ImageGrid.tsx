"use client";

type ImageItem = {
  _id?: string;
  url: string;
  publicId?: string;
  createdAt?: string;
  name?: string;
};

interface Props {
  images: ImageItem[];
  onImageClick: (index: number) => void;
}

const formatName = (img: ImageItem) => img.name?.trim() || img.publicId?.split("/").pop() || "Image";

export default function ImageGrid({ images, onImageClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((img, index) => (
        <div
          key={img._id ?? index}
          onClick={() => onImageClick(index)}
          className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-slate-200/50"
        >
          <div className="relative overflow-hidden aspect-square bg-slate-100">
            <img
              src={img.url}
              alt={formatName(img)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-semibold truncate">
                {formatName(img)}
              </p>
              <p className="text-sm text-slate-200">Click to view</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-purple-600 transition-colors">
              {formatName(img)}
            </p>
            <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 group-hover:w-full transition-all duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}