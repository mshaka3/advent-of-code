import { readFile } from "fs/promises";

export async function processFile(filePath: string): Promise<{
  fileAsArray: string[];
  fileAsString: string;
}> {
  const allFileContents = await readFile(filePath, "utf-8");
  const fileAsArray = allFileContents.trim().split("\n");

  return { fileAsArray, fileAsString: allFileContents };
}
