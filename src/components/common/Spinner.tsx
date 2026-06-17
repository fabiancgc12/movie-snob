import { LoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div className="grid place-items-center p-2 w-full h-full">
      <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
