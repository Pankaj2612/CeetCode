"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { gettable } from "../../../data/table";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface TableProps {
  company?: string;
}

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function TableDemo({ company }: TableProps) {
  const router = useRouter();
  const [question, setQuestion] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const [currpage, setCurrpage] = useState<number>(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const company = searchParams.get("company");
      const difficulty = searchParams.get("difficulty");

      const searchQuery = searchParams.get("searchQuery");
      const page = searchParams.get("page");

      setLoading(true);

      try {
        let queryString = "";
        if (company) queryString += `company=${company}&`;
        if (difficulty) queryString += `difficulty=${difficulty}&`;

        if (searchQuery) queryString += `searchQuery=${searchQuery}&`;
        if (page) queryString += `page=${page}&`;

        const response = await fetch(`/api/dashboard?${queryString}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setQuestion(result);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrpage(newPage);

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Table aria-disabled={loading}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">ID</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Diffculty</TableHead>
            <TableHead>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {question &&
            question.map((question) => (
              <TableRow className="py-5" key={question.id}>
                <TableCell>{question.qid}</TableCell>
                <TableCell className="font-medium">
                  {capitalizeFirstLetter(question.company)}
                </TableCell>
                <Link href={question.leetcodelink} target="_blank">
                  <Button variant="link">
                    <TableCell>{question.title}</TableCell>
                  </Button>
                </Link>
                <TableCell>{question.difficulty}</TableCell>
                <TableCell className="text-center">
                  {question.frequency.substring(0, 4)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currpage > 1) {
                  handlePageChange(currpage - 1);
                }
              }}
              className={currpage === 1 ? "cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                handlePageChange(currpage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
