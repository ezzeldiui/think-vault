"use client";

import { Category } from "@prisma/client";
import { CategoryItem } from "./category-item";

type CategoriesProps = {
  items: Category[];
};

export function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto py-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          item={{ name: item.name, value: item.id }}
        />
      ))}
    </div>
  );
}
