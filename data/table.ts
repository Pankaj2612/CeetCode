import { db } from "./../src/lib/db";

interface getTableProps {
  companyName?: string;
  difficulty?: string;
  tag?: string;
  searchQuery?: string;
  page?: number;
}

export const gettable = async ({
  companyName,
  difficulty,

  searchQuery,
  page = 1,
}: getTableProps) => {
  const itemsPerPage = 20;
  const skip = (page - 1) * itemsPerPage;
  try {
    const data = await db.leetCodeQuestion.findMany({
      where: {
        // Only add conditions if the corresponding value is provided
        company: companyName
          ? { contains: companyName, mode: "insensitive" }
          : undefined,
        difficulty: difficulty
          ? { contains: difficulty, mode: "insensitive" }
          : undefined,

        title: searchQuery
          ? { contains: searchQuery, mode: "insensitive" }
          : undefined,
      },
      take: itemsPerPage,
      skip: skip,
    });

    return data;
  } catch {
    return null;
  }
};

export const getquestionbycompany = async (diificult?: string) => {
  try {
    const data = await db.question.findMany({
      where: {
        difficulty: diificult,
      },
    });

    return data;
  } catch {
    return null;
  }
};
