"use client";

import qs from "query-string";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

type CategoryItemProps = {
  item: {
    name: string;
    value: string;
  };
};

export function CategoryItem({ item }: CategoryItemProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryItemButton item={item} />
    </Suspense>
  );
}

type CategoryItemButtonProps = CategoryItemProps;

function CategoryItemButton({ item }: CategoryItemButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("category");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === item.value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          category: isSelected ? null : item.value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        "flex items-center gap-x-1 border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800",
      )}
    >
      <div>{item.name}</div>
    </Button>
  );
}
