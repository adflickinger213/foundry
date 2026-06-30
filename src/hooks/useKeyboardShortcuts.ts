import { useEffect } from "react";

/**
 * Global, app-wide shortcuts only. Per-component shortcuts (like Cmd+Enter
 * to submit the note composer) live next to that component instead.
 *
 * Cmd/Ctrl+K jumps to Recall and focuses its search box — this is the one
 * shortcut worth making global, since "find a note from anywhere" is the
 * single most useful jump in an app organized around chapters.
 */
export function useKeyboardShortcuts(onJumpToSearch: () => void): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onJumpToSearch();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onJumpToSearch]);
}
