"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const MAX_FILES = 20;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

interface ValidationError {
  file: string;
  message: string;
}

interface DropzoneProps {
  onFilesSelected?: (files: File[]) => void; 
}

export default function Dropzone({ onFilesSelected }: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateFiles = (filesToValidate: File[]) => {
    const valid: File[] = [];
    const invalid: ValidationError[] = [];

    filesToValidate.forEach((file) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        invalid.push({ file: file.name, message: "Invalid file type." });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        invalid.push({ file: file.name, message: "File exceeds 10MB limit." });
        return;
      }
      valid.push(file);
    });

    return { valid, invalid };
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setErrors([]);

      const { valid, invalid } = validateFiles(acceptedFiles);

      if (invalid.length > 0) setErrors(invalid);

      if (valid.length > 0) {
        setFiles((prev) => {
          const updated = [...prev, ...valid];
          onFilesSelected?.(updated); // <-- send files to parent
          return updated;
        });
      }
    },
    [onFilesSelected]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesSelected?.(updated);
      return updated;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
  });

  return (
    <div className="flex flex-col gap-6 item">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
          isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-100/40 hover:bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <UploadCloud className="w-12 h-12 text-gray-500" />
          <p className="text-lg font-medium text-gray-700">Drag & Drop your images here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          {errors.map((error, idx) => (
            <p key={idx} className="text-red-700 text-sm">
              {error.file}: {error.message}
            </p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {files.map((file, idx) => (
            <div key={idx} className="relative">
              <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-32 object-cover rounded-xl" />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
