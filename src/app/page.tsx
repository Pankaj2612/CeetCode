<<<<<<< HEAD
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
=======
import { Session } from "inspector/promises";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}
>>>>>>> 0b23b331c4323be05dd72641963d729bfd50fef9
