import AllFilter from "@/components/dashboard/filter";
import { TableDemo } from "@/components/dashboard/question-table";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      {/* Filters */}
      <div className="w-full">
        <AllFilter />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <TableDemo />
      </div>
    </div>
  );
};
export default Page;
