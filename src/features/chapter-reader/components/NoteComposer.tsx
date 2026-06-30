import { useRef, useState, type KeyboardEvent } from "react";
import { Sparkles, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateNote } from "@/features/notes/hooks/useCreateNote";

interface NoteComposerProps {
  chapterId: number;
}

/**
 * The "living manifesto" capture point — quick-add with no mandatory
 * fields beyond the idea itself, per the friction-removal rules. Tags are
 * optional. Cmd/Ctrl+Enter submits without reaching for the mouse.
 */
export function NoteComposer({ chapterId }: NoteComposerProps) {
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, isPending } = useCreateNote();

  const canSave = body.trim().length > 0 && !isPending;

  const save = (): void => {
    if (!canSave) return;
    mutate(
      { chapterId, body, tags },
      {
        onSuccess: () => {
          setBody("");
          setTags("");
          textareaRef.current?.focus();
        },
      },
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      save();
    }
  };

  return (
    <Card className="p-5 mb-5 bg-white/55 border-line">
      <div className="flex items-center gap-2 mb-2 text-terracotta">
        <Sparkles size={15} strokeWidth={1.8} />
        <span className="text-sm font-medium">Add to the manifesto</span>
      </div>

      <Textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder="An idea, a lesson, a refinement for this chapter…"
        aria-label="New note for this chapter"
      />

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tags (comma separated, optional)"
          aria-label="Tags for this note"
          className="flex-1 min-w-[160px]"
        />
        <Button onClick={save} disabled={!canSave}>
          <Plus size={15} strokeWidth={2} /> Save
        </Button>
      </div>
      <p className="text-xs text-soft mt-1.5">⌘/Ctrl + Enter to save</p>
    </Card>
  );
}
