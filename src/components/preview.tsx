"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.bubble.css";

type PreviewProps = {
  value: string;
};

export function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    [],
  );

  return <ReactQuill theme="bubble" value={value} readOnly />;
}
