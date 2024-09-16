"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function DropdownMenuRadioGroupDemo() {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const handleDifficultyChange = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set("difficulty", newValue);
    } else {
      params.delete("difficulty");
    }

    const newUrl = `${pathname}?${params.toString()}`;

    // Update the URL
    router.push(newUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Difficulty</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          // value={value}
          onValueChange={handleDifficultyChange}
        >
          <DropdownMenuRadioItem value="Easy">Easy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Hard">Hard</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
