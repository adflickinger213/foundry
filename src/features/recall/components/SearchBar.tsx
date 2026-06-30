import { forwardRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange }, ref) => (
    <div role="search" className="relative mb-3">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-mushroom pointer-events-none"
      />
      <Input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search everything you've captured… (⌘K)"
        aria-label="Search notes"
        className="pl-9 pr-4 py-2.5 rounded-full"
      />
    </div>
  ),
);
SearchBar.displayName = "SearchBar";
