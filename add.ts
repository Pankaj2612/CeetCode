// src/lib/importCsvToDatabase.ts
import fs from "fs";
import csv from "csv-parser";
import { db } from "@/lib/db";

// Define a type for the CSV row
interface CsvRow {
  ID: string;
  Title: string;
  Acceptance: string;
  Difficulty: string;
  Frequency: string;
  "Leetcode Question Link": string;
  Company: string;
}

// Function to read CSV file and insert data into the database
export async function importCsvToDatabase(filePath: string): Promise<void> {
  const results: CsvRow[] = [];

  // Read and parse CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: CsvRow) => results.push(data))
      .on("end", async () => {
        console.log("CSV file successfully processed");

        // Insert data into the database
        for (const row of results) {
          try {
            await db.leetCodeQuestion.create({
              data: {
                qid: row["ID"],
                title: row["Title"],
                acceptance: row["Acceptance"],
                difficulty: row["Difficulty"],
                frequency: row["Frequency"],
                leetcodelink: row["Leetcode Question Link"],
                company: row["Company"],
              },
            });
          } catch (error) {
            console.error("Error inserting row:", row, error);
          }
        }
        console.log("Data inserted into the database");
        resolve();
      })
      .on("error", (error) => reject(error));
  });

  await db.$disconnect();
}
