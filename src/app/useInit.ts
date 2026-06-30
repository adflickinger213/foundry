import { useEffect, useState } from "react";
import { seedChaptersIfEmpty } from "@/lib/db";
import { queryClient } from "./queryClient";

type Status = "loading" | "ready" | "error";

/**
 * Runs the one-time database setup on app start, then pre-warms the
 * chapters query so the first frame the user sees is already populated
 * rather than flashing a loading spinner.
 */
export function useInit(): { status: Status; error: string | null } {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init(): Promise<void> {
      try {
        // Seed is idempotent — safe to call every launch.
        await seedChaptersIfEmpty();

        // Pre-warm the chapters cache so the HQ view renders in one pass.
        await queryClient.prefetchQuery({
          queryKey: ["chapters"],
          queryFn: () =>
            import("@/lib/db").then((m) => m.getChapters()),
        });

        if (!cancelled) setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          console.error("Foundry HQ init error:", message);
          setError(message);
          setStatus("error");
        }
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, error };
}
