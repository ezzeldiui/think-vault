import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="transition hover:opacity-75 md:hidden" asChild>
        <Button size="icon" variant="outline">
          <Menu size="24" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0" side="left">
        <SheetHeader>
          <SheetTitle>
            <Sidebar />
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
