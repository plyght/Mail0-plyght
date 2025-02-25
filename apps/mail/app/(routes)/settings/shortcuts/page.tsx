"use client";

import { SettingsCard } from "@/components/settings/settings-card";
import { keyboardShortcuts } from "@/config/shortcuts"; //import the shortcuts
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function ShortcutsPage() {
  const shortcuts = keyboardShortcuts; //now gets shortcuts from the config file

  return (
    <div className="grid gap-6">
      <SettingsCard
        title="Keyboard Shortcuts"
        description="View and customize keyboard shortcuts for quick actions."
        footer={
          <div className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        }
      >
        <div className="grid gap-2 md:grid-cols-2">
          {shortcuts.map((shortcut, index) => (
            <Shortcut key={index} keys={shortcut.keys}>
              {shortcut.action}
            </Shortcut>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

function Shortcut({ children, keys }: { children: ReactNode; keys: string[] }) {
  return (
    <div className="bg-card/50 text-muted-foreground flex items-center justify-between gap-2 rounded-lg border p-2 text-sm">
      <span className="font-medium">{children}</span>
      <div className="flex select-none gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className="border-muted-foreground/10 bg-accent h-6 rounded-[6px] border px-1.5 font-mono text-xs leading-6"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
