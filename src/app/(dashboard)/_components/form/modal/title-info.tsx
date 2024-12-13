import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleHelp, TriangleAlert } from "lucide-react";

export function TitleInfoModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <CircleHelp className="size-5 text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Course Creation Requirement?</AlertDialogTitle>
          <AlertDialogDescription>
            The course you create now is just a draft, meaning you can change
            its details later however this also means that you need to provide a
            proper title for your course. A minimum of 3 characters and a
            maximum of 50
          </AlertDialogDescription>

          <div>
            <Alert variant="warning">
              <TriangleAlert className="flex size-4 h-1/2" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription className="text-xs">
                Write gibberish and you will be banned from creating courses
              </AlertDescription>
            </Alert>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
