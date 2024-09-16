import { CalendarDemo } from "@/components/dashboard/calender";
import { DropdownMenuRadioGroupDemo } from "@/components/dashboard/Difficulty-drop-down";
import { TagFilter } from "@/components/dashboard/dsa-tag-drop-down";
import { TableDemo } from "@/components/dashboard/question-table";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Button } from "@/components/ui/button";

import { FaRandom } from "react-icons/fa";
import { CompanyFilter } from "./../../components/dashboard/company-filter";
import Navbar from "@/components/dashboard/navbar";

const Page = () => {
  return (
    <>
      <div className="grid grid-cols-8 grid-rows-7 gap-1">
        <div className="col-span-6 flex justify-end items-end space-x-2 p-2 ">
          {/* Filters */}

          <CompanyFilter />
          <DropdownMenuRadioGroupDemo />
          <TagFilter />
          <SearchBar />
          <>
            <Button size="sm" variant="ghost">
              <FaRandom />
            </Button>
          </>
        </div>
        <div className=" m-2 pt-3 col-span-2 row-span-4 col-start-7">
          <CalendarDemo />
        </div>
        <div className="col-span-6 row-span-6 row-start-2 ">
          {/* Table */}
          <TableDemo />
        </div>
      </div>
    </>
  );
};

export default Page;
