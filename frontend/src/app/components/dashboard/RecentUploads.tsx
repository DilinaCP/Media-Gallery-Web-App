"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Button";

type ImageItem = {
  _id: string;
  url: string;
  name?: string;
  publicId?: string;
  createdAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

const formatName = (img: ImageItem) => img.name ?? img.publicId?.split("/").pop() ?? "Image";
const formatDate = (img: ImageItem) =>
  img.createdAt ? new Date(img.createdAt).toLocaleDateString() : "";

export default function RecentUploads() {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/images?limit=8`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to load images");
        setImages(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSeeMore = () => router.push("/gallery");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-sm text-gray-500">No uploads yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((file) => (
            <div
              key={file._id}
              className="group flex flex-col gap-2 p-2 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={file.url}
                  alt={formatName(file)}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-sm font-semibold truncate text-gray-800">
                {formatName(file)}
              </p>
              <p className="text-xs text-gray-500">{formatDate(file)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button onClick={handleSeeMore} variant="secondary">
          See More
        </Button>
      </div>
    </div>
  );
}