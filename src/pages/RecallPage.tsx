import { useRef, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SearchBar } from "@/features/recall/components/SearchBar";
import { TagFilterBar } from "@/features/recall/components/TagFilterBar";
import { RecallResults } from "@/features/recall/components/RecallResults";
import { useRecallSearch } from "@/features/recall/hooks/useRecallSearch";
import { useChapters } from "@/features/headquarters/hooks/useChapters";
import { useNotes } from "@/features/notes/hooks/useNotes";

interface RecallPageProps {
  focusOnMount?: boolean;
  /** Called once after focus is applied so the parent can reset the flag. */
  onFocusConsumed?: () => void;
}

/**
 * Recall — find anything you've ever noted down.
 *
 * Three performance decisions the UI depends on:
 * 1. Search is debounced (220ms) so the FTS query fires on pause, not keypress.
 * 2. Full note bodies are not fetched until a NoteCard is opened; the list
 *    only shows previews, which are stored directly on the notes row.
 * 3. Tag filtering is a cheap indexed join, not a full-text scan — so
 *    combining a tag filter with a search term compounds, not slows down.
 */
export function RecallPage({ focusOnMount, onFocusConsumed }: RecallPageProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const { query, setQuery, tag, setTag, notes, allTags } = useRecallSearch();
  const { data: chapters = [] } = useChapters();

  // Total unfiltered count — shows "X of Y notes" and drives the empty state
  const { data: allNotes = [] } = useNotes({ limit: 1000 });

  useEffect(() => {
    if (focusOnMount) {
      searchRef.current?.focus();
      onFocusConsumed?.();
    }
  // onFocusConsumed is intentionally excluded: we want this to fire only
  // when focusOnMount changes, not every time the parent re-renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusOnMount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <SearchBar ref={searchRef} value={query} onChange={setQuery} />
      <TagFilterBar tags={allTags} active={tag} onSelect={setTag} />

      <RecallResults
        notes={notes}
        totalNoteCount={allNotes.length}
        chapters={chapters}
      />

      {/* how recall stays fast — transparent about the architecture */}
      <button
        onClick={() => setHowItWorksOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs mt-8 text-mushroom"
      >
        {howItWorksOpen ? (
          <ChevronDown size={14} strokeWidth={1.8} />
        ) : (
          <ChevronRight size={14} strokeWidth={1.8} />
        )}
        How recall stays fast
      </button>

      {howItWorksOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl p-4 mt-2 text-sm leading-relaxed bg-white/55 border border-line text-soft overflow-hidden"
        >
          Search runs against a SQLite FTS5 full-text index — an inverted
          index over every word in every note — rather than scanning rows
          with LIKE. Tag filtering is an indexed join rather than a text
          scan. Both paths stay quick whether there are 50 notes or 50,000.
          Note bodies are fetched only when you open a card; the list only
          reads previews, which are stored directly on the notes row for
          exactly this reason. Typing is debounced so queries fire on pause,
          not on every keystroke.
        </motion.div>
      )}
    </motion.div>
  );
}
