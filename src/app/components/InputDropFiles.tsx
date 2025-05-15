import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUploaded } from "./FileUploaded";

export const InputDropFiles = ({
  onFilesUpload,
  files,
}: {
  onFilesUpload: (files: File[]) => void;
  files?: File[];
}) => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>(files || []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFilesToUpload((prev) => {
      const newFiles = acceptedFiles.filter(
        (newFile) => !prev.some((existingFile) => 
          existingFile.name === newFile.name && 
          existingFile.size === newFile.size
        )
      );
      return [...prev, ...newFiles];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    onFilesUpload(filesToUpload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesToUpload]);

  const handleRemoveFile = (file: File) => {
    setFilesToUpload((prev) => prev.filter((f) => f !== file));
  };

  return (
    <div {...getRootProps()}>
      <div
        className={`border-dashed border-2 rounded p-4 hover:bg-gray-50 transition-colors ${
          isDragActive && "border-violet-700 bg-violet-50"
        }`}
      >
        {filesToUpload.length > 0 ? (
          <div className="flex flex-col gap-1">
            {filesToUpload.map((file) => (
              <FileUploaded
                key={file.name}
                file={file}
                onRemove={() => handleRemoveFile(file)}
              />
            ))}
          </div>
        ) : (
          <>
            <Label className="flex flex-col items-center justify-center gap-1.5">
              <div className="border rounded flex items-center justify-center p-3">
                <FileUp size={26} strokeWidth={1.5} />
              </div>
              <p className="font-bold">
                {isDragActive
                  ? "Arrastra y suelta tus archivos aquí"
                  : "Sube tus archivos"}
              </p>
              <small className="text-xs text-gray-500 font-normal">
                Arrastra y suelta tus archivos aquí o haz click para subir
              </small>
            </Label>
          </>
        )}
        <Input type="file" {...getInputProps()} multiple />
      </div>
    </div>
  );
};
