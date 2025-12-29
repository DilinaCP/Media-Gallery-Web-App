"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Zip from "../components/zip/Zip";
import useFetch from "../hooks/useFetch";

type Image = {
  _id: string;
  name: string;
  url: string;
};

export default function ZipPage() {
  const { data, isLoading, error, refetch } = useFetch<Image[]>("/images");
  const images = data ?? [];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-10 pt-20 pl-56 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Download as ZIP</h1>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium">
              {error}
            </p>
          )}

          {isLoading && <p className="text-gray-600">Loading images...</p>}
          {!isLoading && images.length > 0 && <Zip images={images} />}
          {!isLoading && images.length === 0 && !error && (
            <p className="text-gray-600">No images available yet. Upload some first.</p>
          )}
        </div>
      </div>
    </div>
  );
}