"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, AlertCircle, CheckCircle2 } from "lucide-react";

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
          // Defer callback to after state update completes
          setTimeout(() => {
            onFilesSelected?.(updated);
          }, 0);
          return updated;
        });
      }
    },
    [onFilesSelected]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Defer callback to after state update completes
      setTimeout(() => {
        onFilesSelected?.(updated);
      }, 0);
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
    <div className="flex flex-col gap-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? "border-purple-500 bg-linear-to-br from-purple-50 to-pink-50 scale-105" 
            : "border-slate-300 bg-linear-to-br from-slate-50 to-slate-100 hover:border-purple-400 hover:from-slate-100 hover:to-slate-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={`p-3 rounded-full transition-colors duration-300 ${
            isDragActive 
              ? "bg-purple-500 text-white" 
              : "bg-linear-to-br from-purple-500 to-pink-500 text-white"
          }`}>
            <UploadCloud size={32} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">Drag & Drop your images</p>
            <p className="text-sm text-slate-600 mt-1">or <span className="font-semibold text-purple-600">click to browse</span></p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
            <span>JPG, PNG, GIF, WebP</span>
            <span className="text-slate-400">•</span>
            <span>Max 10MB per file</span>
            <span className="text-slate-400">•</span>
            <span>Up to {MAX_FILES} files</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-red-600" />
            <p className="font-semibold text-red-800">Upload Errors</p>
          </div>
          {errors.map((error, idx) => (
            <p key={idx} className="text-red-700 text-sm flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong>{error.file}:</strong> {error.message}</span>
            </p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <p className="font-semibold text-slate-900">Ready to upload ({files.length} file{files.length !== 1 ? 's' : ''})</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((file, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-purple-400 transition-all duration-300">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={file.name} 
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <button
                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 rounded-full p-2 shadow-lg transition-all duration-300 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                    title={`Remove ${file.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs truncate font-medium">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
