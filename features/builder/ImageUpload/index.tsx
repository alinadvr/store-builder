import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FileWithPath } from "file-selector";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function ImageUpload({
  files,
  setFiles,
  deleteFile,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
  deleteFile: (file: File) => void;
}) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".svg"],
      "image/webp": [".webp"],
    },
    onDrop,
  });

  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={file.name} className="relative">
              <XCircleIcon
                className="absolute right-2 top-2 cursor-pointer text-slate-400 hover:text-slate-700"
                onClick={() => deleteFile(file)}
              />
              <Image
                src={URL.createObjectURL(file)}
                width={245}
                height={150}
                alt={file.name}
                className="h-full w-full"
              />
            </div>
          ))}
      </div>
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 p-8"
      >
        <input {...getInputProps()} />
        <ArrowUpTrayIcon className="mb-4 w-14 text-slate-300" />
        <h3 className="text-violet-700">Choose images or drag and drop here</h3>
        <p className="text-sm text-slate-600">Images up to 4MB, max 10</p>
      </div>
    </div>
  );
}
