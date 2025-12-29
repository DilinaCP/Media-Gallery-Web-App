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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <Header />
      <div className="ml-0 md:ml-64 pt-16 md:pt-24 p-4 sm:p-6 md:p-8 pb-20 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Download as ZIP</h1>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 transition-all"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 font-medium">
            {error}
          </p>
        )}

        {isLoading && <p className="text-gray-300">Loading images...</p>}
        {!isLoading && images.length > 0 && <Zip images={images} />}
        {!isLoading && images.length === 0 && !error && (
          <p className="text-gray-300">No images available yet. Upload some first.</p>
        )}
      </div>
    </div>
  );
}