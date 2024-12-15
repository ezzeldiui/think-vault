"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryStates, parseAsString } from "nuqs";
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
  const [{ categoryId, title }, setQuery] = useQueryStates({
    categoryId: parseAsString,
    title: parseAsString,
  });

  const isSelected = categoryId === item.value;

  const onClick = () => {
    setQuery({
      categoryId: isSelected ? null : item.value,
      title,
    });
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
