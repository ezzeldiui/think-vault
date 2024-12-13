"use client";

import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function CoursePage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{
    courseId: string;
  } | null>(null);

//   idk why this is here

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { courseId } = resolvedParams;
  return <div>Course Id Page {courseId}</div>;
}
