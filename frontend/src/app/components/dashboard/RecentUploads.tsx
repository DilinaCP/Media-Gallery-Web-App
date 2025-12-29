"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { Image as ImageIcon, Calendar } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const load = async () => {
      try {
        // Gallery is now public, no token needed for viewing
        const res = await fetch(`${API_BASE}/images?limit=8`, {
          headers: {},
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
  }, [mounted]);

  const handleSeeMore = () => router.push("/gallery");

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl shadow-lg border border-slate-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <ImageIcon size={20} />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Recent Uploads
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin">
            <div className="w-8 h-8 border-3 border-slate-300 border-t-purple-500 rounded-full"></div>
          </div>
          <p className="ml-3 text-slate-600 font-medium">Loading...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon size={40} className="mx-auto mb-3 text-slate-400" />
          <p className="text-slate-600 font-medium">No uploads yet.</p>
          <p className="text-sm text-slate-500">Start by uploading your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((file) => (
            <div
              key={file._id}
              className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => router.push("/gallery")}
            >
              <div className="overflow-hidden relative bg-slate-200 aspect-square">
                <img
                  src={file.url}
                  alt={formatName(file)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <p className="text-sm font-semibold truncate text-slate-900 group-hover:text-purple-600 transition-colors">
                  {formatName(file)}
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar size={12} />
                  <span>{mounted && formatDate(file)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button onClick={handleSeeMore} variant="secondary">
          View All Images
        </Button>
      </div>
    </div>
  );
}