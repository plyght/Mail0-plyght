"use client";

import {
  Pencil,
  Tag,
  MailCheck,
  MailPlus,
  CircleHelp,
  FolderPlus,
  ArrowUpRight,
  Search,
  Archive,
  ArchiveX,
  Reply,
  ReplyAll,
  Forward,
  BellOff,
} from "lucide-react";
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
import { useOpenComposeModal } from "@/hooks/use-open-compose-modal"; // Import the hook
import { useState, useEffect } from "react";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const { open: openComposeModal } = useOpenComposeModal();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Command Menu */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => runCommand(() => openComposeModal())}>
              <Pencil size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Compose message</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Create label"))}>
              <Tag size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Create label</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Create folder"))}>
              <FolderPlus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Create folder</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Mark inbox as read"))}>
              <MailCheck size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Mark inbox as read</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Import mail"))}>
              <MailPlus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Import mail</span>
            </CommandItem>

            <CommandItem onSelect={() => runCommand(() => console.log("Reply"))}>
              <Reply size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Reply</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Reply All"))}>
              <ReplyAll size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Reply All</span>
              <CommandShortcut>⌘⇧R</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Forward"))}>
              <Forward size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Forward</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Archive Email"))}>
              <Archive size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Archive Email</span>
              <CommandShortcut>⌘⇧H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Mute Thread"))}>
              <BellOff size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Mute Thread</span>
              <CommandShortcut>⌘⇧M</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Move to Folder"))}>
              <FolderPlus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Move to Folder</span>
              <CommandShortcut>⌘⇧E</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Mark as Spam"))}>
              <ArchiveX size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Mark as Spam</span>
              <CommandShortcut>⌘⇧J</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Search"))}>
              <Search size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Search</span>
              <CommandShortcut>⌘/</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Help">
            <CommandItem onSelect={() => runCommand(() => console.log("Help with shortcuts"))}>
              <CircleHelp size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Help with shortcuts</span>
              <CommandShortcut>⌘?</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => window.open("https://github.com/nizzyabi/mail0", "_blank"))
              }
            >
              <ArrowUpRight size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
              <span>Go to docs</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
