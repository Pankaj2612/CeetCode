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

const companies = [
  { value: "google", label: "Google" },
  { value: "microsoft", label: "Microsoft" },
  { value: "amazon", label: "Amazon" },
  { value: "facebook", label: "Facebook" },
  { value: "apple", label: "Apple" },
];

export function CompanyFilter() {
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
      params.set("company", newValue);
    } else {
      params.delete("company");
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
         Companies
          {/* {value
            ? companies.find((company) => company.value === value)?.label
            : "Companies"} */}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Companies..." className="h-9" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.value}
                  value={company.value}
                  onSelect={() => handleSelect(company.value)}>
                  {company.label}
                  {/* <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
