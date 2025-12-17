"use client";

import { useCallback, useMemo, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Dropzone from "../components/upload/Dropzone";
import Button from "../components/common/Button";

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
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex justify-center items-center p-30 bg-linear-to-br from-gray-50 via-white to-gray-100">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8 w-full max-w-4xl">
            <Dropzone onFilesSelected={handleFilesSelected} />

            {files.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Rename Image:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {files.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 truncate w-28">{item.file.name}</span>
                      <input
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        value={item.name}
                        onChange={(e) => handleNameChange(item.key, e.target.value)}
                        placeholder="Enter new name (keep extension)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="primary" onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;