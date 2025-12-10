"use client";

import Button from "../common/Button";
import { useRouter } from "next/navigation";

const mockUploads = [
  { id: 1, name: "sunset.jpg", date: "2025-01-02", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=400&fit=crop&q=80" },
  { id: 2, name: "mountain.png", date: "2025-01-04", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80" },
  { id: 3, name: "cityscape.jpg", date: "2025-01-06", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop&q=80" },
  { id: 4, name: "forest.png", date: "2025-01-08", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80" },
  { id: 5, name: "beach.jpg", date: "2025-01-10", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&q=80" },
];

export default function RecentUploads() {
  const router = useRouter();

  const handleSeeMore = () => router.push('/gallery');

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockUploads.map((file) => (
          <div
            key={file.id}
            className="group flex flex-col gap-2 p-2 rounded-xl hover:bg-gray-50 transition"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-semibold truncate text-gray-800">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">{file.date}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleSeeMore} variant="secondary">
          See More
        </Button>
      </div>
    </div>
  );
}
