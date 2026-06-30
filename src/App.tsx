import { useState, useCallback } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/queryClient";
import { useInit } from "@/app/useInit";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Header } from "@/components/layout/Header";
import { NavTabs, type ViewId } from "@/components/layout/NavTabs";
import { ToastStack } from "@/components/layout/ToastStack";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingState } from "@/components/ui/LoadingState";
import { Card } from "@/components/ui/Card";
import { HQPage } from "@/pages/HQPage";
import { ChapterReaderPage } from "@/pages/ChapterReaderPage";
import { RecallPage } from "@/pages/RecallPage";
import { useProgress } from "@/features/headquarters/hooks/useProgress";
import { useChapters } from "@/features/headquarters/hooks/useChapters";

/**
 * The app uses a manual, in-memory view stack instead of a URL router.
 * Tauri desktop apps have no meaningful URL bar, and the navigation here
 * is simple enough (HQ → read a chapter → back) that a router would add
 * more ceremony than value. If a future version adds deep-linking (e.g.
 * for cross-linked notes), this is where you'd add react-router-dom.
 */
type View =
  | { id: "hq" }
  | { id: "recall"; focusSearch?: boolean }
  | { id: "chapter"; num: number };

function AppShell() {
  const { status, error } = useInit();
  const [view, setView] = useState<View>({ id: "hq" });
  const [recallFocus, setRecallFocus] = useState(false);

  const { data: chapters = [] } = useChapters();
  const { data: exploredIds = [] } = useProgress();

  const jumpToSearch = useCallback(() => {
    setRecallFocus(true);
    setView({ id: "recall", focusSearch: true });
  }, []);

  useKeyboardShortcuts(jumpToSearch);

  // Derive active tab for the NavTabs component
  const activeTab: ViewId = view.id === "recall" ? "recall" : "hq";

  const handleTabChange = useCallback(
    (id: ViewId) => {
      if (id === "hq") {
        setView({ id: "hq" });
      } else {
        setRecallFocus(false);
        setView({ id: "recall" });
      }
    },
    [],
  );

  const handleOpenChapter = useCallback((num: number) => {
    setView({ id: "chapter", num });
  }, []);

  const handleBackToHQ = useCallback(() => {
    setView({ id: "hq" });
  }, []);

  if (status === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-5">
        <LoadingState label="Opening the headquarters…" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-3xl mx-auto px-5 pt-16">
        <Card className="p-6 text-center">
          <p className="font-display text-xl text-ink">
            The headquarters didn't open.
          </p>
          <p className="text-sm mt-1 text-soft">
            {error ?? "An unexpected error occurred on startup."}
          </p>
          <p className="text-xs mt-3 text-mushroom">
            Try relaunching the app. Your notes are safe — they live in a
            local SQLite database and are not affected by startup errors.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 pb-24 scrollbar-soft">
      {/* Header only shows on top-level views, not inside a chapter */}
      {view.id !== "chapter" && (
        <Header
          exploredCount={exploredIds.length}
          totalChapters={chapters.length || 11}
        />
      )}

      {view.id !== "chapter" && (
        <NavTabs active={activeTab} onChange={handleTabChange} />
      )}

      <div className={view.id !== "chapter" ? "mt-6" : "mt-4"}>
        <ErrorBoundary>
          {view.id === "hq" && (
            <HQPage onOpenChapter={handleOpenChapter} />
          )}

          {view.id === "chapter" && (
            <ChapterReaderPage
              chapterNum={view.num}
              onBack={handleBackToHQ}
            />
          )}

          {view.id === "recall" && (
            <RecallPage
              focusOnMount={recallFocus}
              onFocusConsumed={() => setRecallFocus(false)}
            />
          )}
        </ErrorBoundary>
      </div>

      <ToastStack />
    </div>
  );
}

// QueryClientProvider lives at the module boundary so it wraps
// everything, including the hooks inside AppShell.
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
