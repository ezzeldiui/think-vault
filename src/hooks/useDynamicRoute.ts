import { useRouter } from "next/router";

export function useDynamicRoute(key: string) {
  const router = useRouter();
  const param = router.query[key] as string;
  return { param };
}
