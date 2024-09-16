import Navbar from "@/components/dashboard/navbar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="sm:px-52 w-full">{children}</div>;
    </>
  );
}
