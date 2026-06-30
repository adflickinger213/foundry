interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Opening the headquarters…" }: LoadingStateProps) {
  return (
    <div role="status" className="py-24 text-center text-soft text-sm">
      {label}
    </div>
  );
}
