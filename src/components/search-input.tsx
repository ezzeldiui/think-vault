"use client";

import { parseAsString, useQueryState } from "nuqs";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Suspense } from "react";

export function SearchInput() {
  return (
    <Suspense fallback={<div>Loading search input...</div>}>
      <SearchInputField />
    </Suspense>
  );
}

function SearchInputField() {
  const [title, setTitle] = useQueryState(
    "title",
    parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true, throttleMs: 500 }),
  );
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 size-4 text-slate-600" />
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
        placeholder="Search"
      />
    </div>
  );
}
