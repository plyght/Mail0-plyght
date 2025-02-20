"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useOpenComposeModal } from "@/hooks/use-open-compose-modal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { navigationConfig, NavItem } from "@/config/navigation"; // Import NavItem
import { useRouter } from "next/navigation";
import * as React from "react";

type CommandPaletteContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openModal: () => void;
};
const CommandPaletteContext = React.createContext<CommandPaletteContext | null>(null);

export function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider.");
  }
  return context;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const { setOpen: setComposeOpen } = useOpenComposeModal();
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setComposeOpen(true);
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setComposeOpen]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const allCommands = React.useMemo(() => {
    const mailCommands: { group: string; item: NavItem }[] = [];
    const settingsCommands: { group: string; item: NavItem }[] = [];
    const otherCommands: { group: string; item: NavItem }[] = [];

    for (const sectionKey in navigationConfig) {
      const section = navigationConfig[sectionKey];
      section.sections.forEach((group) => {
        const filteredItems = group.items.filter((item) => item.title !== "Back to Mail");
        filteredItems.forEach((item) => {
          if (sectionKey === "mail") {
            mailCommands.push({ group: sectionKey, item });
          } else if (sectionKey === "settings") {
            settingsCommands.push({ group: sectionKey, item });
          } else {
            otherCommands.push({ group: sectionKey, item });
          }
        });
      });
    }
    return [
      { group: "Mail", items: mailCommands.map((c) => c.item) },
      { group: "Settings", items: settingsCommands.map((c) => c.item) },
      ...otherCommands.map((section) => ({ group: section.group, items: section.item })),
    ];
  }, []);

  return (
    <CommandPaletteContext.Provider
      value={{
        open,
        setOpen,
        openModal: () => {
          setComposeOpen(true);
          setOpen(false);
        },
      }}
    >
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Mail 0 - Command Palette</DialogTitle>
          <DialogDescription>Quick navigation and actions for Mail 0.</DialogDescription>
        </VisuallyHidden>
        <CommandInput autoFocus placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {allCommands.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              <CommandGroup heading={group.group}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.url}
                    onSelect={() =>
                      runCommand(() => {
                        if (item.title === "Compose") {
                          openModal();
                        } else {
                          router.push(item.url);
                        }
                      })
                    }
                  >
                    {item.icon && (
                      <item.icon
                        size={16}
                        strokeWidth={2}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.title}</span>
                    {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                  </CommandItem>
                ))}
              </CommandGroup>
              {groupIndex < allCommands.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
      {children}
    </CommandPaletteContext.Provider>
  );
}
