import { useEffect, useState } from "react";

export function useParams<T>(params: Promise<T>): T | null {
  const [resolvedParams, setResolvedParams] = useState<T | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  return resolvedParams;
}
