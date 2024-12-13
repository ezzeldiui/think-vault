"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

type FileUploadProps = {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error("Upload failed: " + error?.message);
      }}
    />
  );
}
