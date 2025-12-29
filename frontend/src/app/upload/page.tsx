"use client";

import { useCallback, useMemo, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Dropzone from "../components/upload/Dropzone";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { Upload as UploadIcon } from "lucide-react";

type UploadItem = {
  file: File;
  name: string;
  key: string;
};

const makeKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

const Upload = () => {
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles((prev) => {
      const prevMap = new Map(prev.map((item) => [item.key, item]));
      return selectedFiles.map((file) => {
        const key = makeKey(file);
        const existing = prevMap.get(key);
        return { file, name: existing?.name ?? file.name, key };
      });
    });
  }, []);

  const handleNameChange = (key: string, value: string) => {
    setFiles((prev) =>
      prev.map((item) => (item.key === key ? { ...item, name: value } : item))
    );
  };

  const filesForUpload = useMemo(
    () =>
      files.map(({ file, name }) =>
        name && name !== file.name ? new File([file], name, { type: file.type }) : file
      ),
    [files]
  );

  const handleUpload = async () => {
    if (filesForUpload.length === 0) return alert("Please select at least one file.");

    setLoading(true);
    const formData = new FormData();
    filesForUpload.forEach((file) => formData.append("image", file));
    formData.append("names", JSON.stringify(files.map((f) => f.name)));

    try {
      const res = await fetch("http://localhost:4000/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await res.json();
      alert("Upload successful!");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed, check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-900">
      <Sidebar />
      <div className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-slate-900 to-purple-900 border-b border-purple-500/20 shadow-lg z-30">
        <Header />
      </div>
      <div className="ml-64 pt-24 flex flex-col min-h-screen">
        <div className="flex justify-center items-center p-8 pb-20">
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 text-white">
                <UploadIcon size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Upload Images
                </h1>
                <p className="text-slate-400">Add your images to the gallery</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
              <Dropzone onFilesSelected={handleFilesSelected} />

              {files.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center">
                      {files.length}
                    </div>
                    <p className="text-sm font-semibold text-slate-200">Customize Image Names</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {files.map((item) => (
                      <div key={item.key} className="space-y-2">
                        <p className="text-xs text-slate-400 truncate">Original: {item.file.name}</p>
                        <Input
                          value={item.name}
                          onChange={(e) => handleNameChange(item.key, e.target.value)}
                          placeholder="Enter new name (keep extension)"
                          className="bg-slate-700/50 border-slate-600 text-slate-100 focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8 pt-8 border-t border-slate-700">
                <Button 
                  variant="secondary" 
                  onClick={() => setFiles([])}
                  disabled={loading}
                >
                  Clear All
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpload} 
                  disabled={loading || files.length === 0}
                >
                  {loading ? "Uploading..." : "Upload Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;