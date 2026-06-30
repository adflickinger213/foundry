import { Compass, Search } from "lucide-react";
import { Tabs, type TabItem } from "@/components/ui/Tabs";

export type ViewId = "hq" | "recall";

const ITEMS: TabItem<ViewId>[] = [
  { id: "hq", label: "Headquarters", icon: <Compass size={15} strokeWidth={1.8} /> },
  { id: "recall", label: "Recall", icon: <Search size={15} strokeWidth={1.8} /> },
];

interface NavTabsProps {
  active: ViewId;
  onChange: (id: ViewId) => void;
}

export function NavTabs({ active, onChange }: NavTabsProps) {
  return <Tabs items={ITEMS} active={active} onChange={onChange} />;
}
