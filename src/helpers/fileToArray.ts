import { readFile } from "fs/promises";

export async function fileToArray(filePath: string): Promise<{
  fileAsArray: string[];
  fileAsString: string;
}> {
  const allFileContents = await readFile(filePath, "utf-8");
  const fileAsArray = allFileContents.split("\n");

  return { fileAsArray, fileAsString: allFileContents };
}
