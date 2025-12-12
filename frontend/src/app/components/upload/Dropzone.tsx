"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 20;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

interface ValidationError {
  file: string;
  message: string;
}

export default function Dropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateFiles = (filesToValidate: File[]): { valid: File[], invalid: ValidationError[] } => {
    const valid: File[] = [];
    const invalid: ValidationError[] = [];

    filesToValidate.forEach((file) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        invalid.push({
          file: file.name,
          message: `Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.`
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        invalid.push({
          file: file.name,
          message: `File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
        });
        return;
      }

      valid.push(file);
    });

    return { valid, invalid };
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setErrors([]); 

    const totalFiles = files.length + acceptedFiles.length;
    if (totalFiles > MAX_FILES) {
      setErrors([{
        file: "Upload limit",
        message: `Cannot upload more than ${MAX_FILES} files at once. Current: ${files.length}, Attempting: ${acceptedFiles.length}`
      }]);
      return;
    }

    const { valid, invalid } = validateFiles(acceptedFiles);

    const rejectionErrors: ValidationError[] = rejectedFiles.map((rejection) => ({
      file: rejection.file.name,
      message: rejection.errors.map((e: any) => e.message).join(", ")
    }));

    const allErrors = [...invalid, ...rejectionErrors];

    if (allErrors.length > 0) {
      setErrors(allErrors);
    }

    if (valid.length > 0) {
      setFiles((prev) => [...prev, ...valid]);
    }
  }, [files.length]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"]
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
  });

  return (
    <div className="flex flex-col gap-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition 
          ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 bg-gray-100/40 hover:bg-gray-100"
          }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          <UploadCloud className="w-12 h-12 text-gray-500" />
          <p className="text-lg font-medium text-gray-700">
            Drag & Drop your images here
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
          <p className="text-xs text-gray-400 mt-2">
            Max {MAX_FILES} files • Max {MAX_FILE_SIZE / 1024 / 1024}MB per file • JPEG, PNG, GIF, WebP
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-2">Upload Errors</h4>
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700">
                    <span className="font-medium">{error.file}:</span> {error.message}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setErrors([])}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
          <h3 className="text-md font-semibold mb-3">Files Selected</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-xl overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />

                <button
                  className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>

                <p className="text-xs text-gray-700 mt-1 truncate px-2 pb-2">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
