"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ImageGrid from "../components/gallery/ImageGrid";
import ImageCard from "../components/gallery/ImageCard";
import Loader from "../components/common/Loader";
import { Images as ImagesIcon } from "lucide-react";

type ImageItem = {
  _id: string;
  url: string;
  publicId?: string;
  createdAt?: string;
  name?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

export default function GalleryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const load = async () => {
      try {
        // Gallery is now public, no token needed for viewing
        const res = await fetch(`${API_BASE}/images`, {
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

  const openImage = (index: number) => setActiveIndex(index);
  const closeImage = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((prev) => (prev && prev > 0 ? prev - 1 : prev));
  const goNext = () =>
    setActiveIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <div className="p-8 pt-24 pb-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 text-white">
                <ImagesIcon size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Image Gallery
                </h1>
                <p className="text-slate-400 text-sm">Browse all uploaded images</p>
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <ImagesIcon size={48} className="mx-auto mb-4 text-slate-400" />
              <p className="text-slate-400 font-medium mb-2">No images yet</p>
              <p className="text-slate-500 text-sm">Start by uploading your first image to the gallery</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-slate-300 text-sm font-medium">
                  Showing <span className="text-purple-400 font-bold">{images.length}</span> image{images.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ImageGrid images={images} onImageClick={openImage} />
            </>
          )}
        </div>
        {activeIndex !== null && images[activeIndex] && (
          <ImageCard
            image={images[activeIndex]}
            onClose={closeImage}
            onPrev={goPrev}
            onNext={goNext}
            disablePrev={activeIndex === 0}
            disableNext={activeIndex === images.length - 1}
          />
        )}
      </div>
    </div>
  );
}