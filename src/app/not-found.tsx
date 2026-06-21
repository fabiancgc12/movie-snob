import { FileQuestion, HomeIcon } from "lucide-react";
import { EmptyState } from "@/components/Layout/EmptyState";
import { LinkButton } from "@/components/Layout/LinkButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <EmptyState
        title="Page not found"
        description={
          "The page you’re looking for doesn’t exist or has been moved."
        }
        icon={FileQuestion}
      >
        <LinkButton href={"/en-US"}>
          <HomeIcon />
          Go home
        </LinkButton>
      </EmptyState>
    </div>
  );
}
