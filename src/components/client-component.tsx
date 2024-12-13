"use client";

import { useEffect } from "react";
import { useParams } from "@/hooks/useParams";

interface ClientComponentProps {
  params: Promise<{
    courseId: string;
  }>;
  onParamsResolved: (resolvedParams: { courseId: string }) => void;
}

export default function ClientComponent({
  params,
  onParamsResolved,
}: ClientComponentProps) {
  const resolvedParams = useParams(params);

  useEffect(() => {
    if (resolvedParams) {
      onParamsResolved(resolvedParams);
    }
  }, [resolvedParams, onParamsResolved]);

  return null;
}
