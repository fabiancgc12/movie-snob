import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/Layout/EmptyState";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <EmptyState title="Page not found" />
      <Button
        render={(props) => (
          <Link {...props} href="/en-US">
            Go home
          </Link>
        )}
      />
    </div>
  );
}
