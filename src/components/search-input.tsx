"use client";

import qs from "query-string";

import { useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchInput() {
  return (
    <Suspense fallback={null}>
      <SearchInputField />
    </Suspense>
  );
}

function SearchInputField() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        category: currentCategoryId,
        title: debouncedValue,
      },
    });

    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname, router]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 size-4 text-slate-600" />

      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
        placeholder="Search"
      />
    </div>
  );
}
