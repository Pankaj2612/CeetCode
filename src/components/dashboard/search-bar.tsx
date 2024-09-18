"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { XIcon } from "lucide-react"; // Import the cross icon from lucide-react
import { ModeToggle } from "./theme-toggle-button";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
    // Clear the URL parameter if needed
    const params = new URLSearchParams(searchParams);
    params.delete("searchQuery");
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    if (search.trim()) {
      params.set("searchQuery", search.trim());
    } else {
      params.delete("searchQuery");
    }

    // Construct the new URL with updated parameters
    const newUrl = `${pathname}?${params.toString()}`;

    // Navigate to the new URL
    router.push(newUrl);
  };

  return (
    <div className="relative flex w-full space-x-2">
      <form onSubmit={handleSubmit} className="flex w-full space-x-2">
        <div className="relative flex items-center w-full">
          <Input
            placeholder="Search questions"
            value={search}
            onChange={handleInputChange}
            className="pr-10" // Add padding to the right to make space for the icon
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-100 hover:text-gray-700">
              <XIcon />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">
          Search
        </Button>
        <ModeToggle />
      </form>
    </div>
  );
}
