import type { ReactNode } from "react";
import { Card } from "./Card";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * Per the cognitive-design rules: an empty state is an invitation to act,
 * never the default view a user lands on, and never phrased as an apology
 * or a guilt nudge. Callers should only render this behind a real "there's
 * genuinely nothing here yet" check, not as a loading placeholder.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="p-8 text-center">
      {icon && <div className="flex justify-center mb-2 text-gold">{icon}</div>}
      <p className="font-display text-xl text-ink">{title}</p>
      {description && <p className="text-sm mt-1 text-soft">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}
