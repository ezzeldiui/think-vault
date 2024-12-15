"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, useEffect } from "react";

export function SearchInput() {
  const [value, setValue] = useQueryState(
    "title",
    parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true, throttleMs: 500 }),
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 transform text-slate-600" />

      <Input
        onChange={handleChange}
        value={value || ""}
        placeholder="Search"
        className="w-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
      />
    </div>
  );
}
