"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Button from "../common/Button";

interface Image {
  id: number;
  name: string;
  url: string;
}

interface ZipProps {
  images: Image[];
}

export default function Zip({ images }: ZipProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelected(images.map((img) => img.id));
  const deselectAll = () => setSelected([]);

  const downloadZip = async () => {
    if (selected.length === 0) {
      alert("Select at least one image!");
      return;
    }

    setIsDownloading(true);
    setError(null);

    const zip = new JSZip();

    try {
      await Promise.all(
        selected.map(async (id) => {
          const img = images.find((i) => i.id === id);
          if (!img) return;

          const res = await fetch(img.url, { cache: "no-store" });
          if (!res.ok) {
            throw new Error(`Failed to fetch ${img.name}`);
          }

          const buffer = await res.arrayBuffer();
          zip.file(img.name, buffer);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "images.zip");
    } catch (err) {
      console.error(err);
      setError("Could not download all images. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4">
        <Button variant="secondary" onClick={selectAll}>Select All</Button>
        <Button variant="secondary" onClick={deselectAll}>Deselect All</Button>
        <Button
          variant="primary"
          onClick={downloadZip}
          disabled={isDownloading}
        >
          {isDownloading ? "Preparing ZIP..." : `Download Selected (${selected.length})`}
        </Button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 font-medium">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => toggleSelect(img.id)}
            className={`relative cursor-pointer rounded-2xl overflow-hidden border transition ${
              selected.includes(img.id)
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200"
            }`}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
            />
            <p className="absolute bottom-2 left-2 text-white text-sm font-semibold shadow px-2 rounded bg-black/50">
              {img.name}
            </p>
            {selected.includes(img.id) && (
              <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold shadow">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
