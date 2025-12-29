"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ImageGrid from "../components/gallery/ImageGrid";
import ImageCard from "../components/gallery/ImageCard";

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

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/images`, {
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

  const openImage = (index: number) => setActiveIndex(index);
  const closeImage = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((prev) => (prev && prev > 0 ? prev - 1 : prev));
  const goNext = () =>
    setActiveIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-10 pt-20 pl-56">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-gray-500">No uploads yet.</p>
          ) : (
            <ImageGrid images={images} onImageClick={openImage} />
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