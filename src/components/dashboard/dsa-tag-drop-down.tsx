"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dataStructures = [
  { value: "Array", label: "Array" },
  { value: "Linked List", label: "Linked List" },
  { value: "Stack", label: "Stack" },
  { value: "Queue", label: "Queue" },
  { value: "Hash Table", label: "Hash Table" },
  { value: "Tree", label: "Tree" },
  { value: "Graph", label: "Graph" },
  { value: "Heap", label: "Heap" },
];

export function TagFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set("tag", newValue);
    } else {
      params.delete("tag");
    }

    const newUrl = `${pathname}?${params.toString()}`;

    // Update the URL
    router.push(newUrl);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {value
            ? dataStructures.find((dsa) => dsa.value === value)?.label
            : "Tags"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Tags..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Tag Found</CommandEmpty>
            <CommandGroup>
              {dataStructures.map((dsa) => (
                <CommandItem
                  key={dsa.value}
                  value={dsa.value}
                  onSelect={() => handleSelect(dsa.value)}>
                  {dsa.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === dsa.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
