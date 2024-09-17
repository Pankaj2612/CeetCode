"use client";

import { Suspense, useEffect, useState } from "react";
import { FaRandom } from "react-icons/fa";
import { Button } from "../ui/button";
import { CompanyFilter } from "./company-filter";
import { DropdownMenuRadioGroupDemo } from "./Difficulty-drop-down";
import { TagFilter } from "./dsa-tag-drop-down";
import { SearchBar } from "./search-bar";
import { Badge } from "../ui/badge";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "./question-table";
import Loader from "../ui/loader";

export default function AllFilter() {
  const [badges, setBadges] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newBadges: string[] = [];

    params.forEach((value) => {
      // Add the value to badges array if it's not empty
      if (value) {
        newBadges.push(value);
      }
    });

    setBadges(newBadges);
  }, [searchParams]);

  const handleRemoveBadge = (badge: string) => {
    const params = new URLSearchParams(searchParams);
    // Find and remove the specific parameter by value
    for (const [key, value] of params) {
      if (value === badge) {
        params.delete(key);
        break;
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Suspense fallback={<Loader/>}>
      <div className="flex flex-col">
        <div className="flex  space-x-2 p-2">
          {/* Filters */}
          <CompanyFilter />
          <DropdownMenuRadioGroupDemo />
          {/* <TagFilter /> */}
          <SearchBar />
          <Button size="sm" variant="ghost">
            <FaRandom />
          </Button>
        </div>
        <div className="flex space-x-2 p-2">
          {badges.map((badge, index) => (
            <Badge key={index} onRemove={() => handleRemoveBadge(badge)}>
              {capitalizeFirstLetter(badge)}
            </Badge>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
