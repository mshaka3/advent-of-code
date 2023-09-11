import { readFile } from "fs/promises";
import { join } from "path";

export async function day2() {
  const filePath = join(__dirname, "input.txt");
  const allFileContents = await readFile(filePath, "utf-8");
  const fileToArray = allFileContents.split("\n");

  var scoreMap: { [key in string]: number[] } = {
    A: [3, 1, 2],
    B: [1, 2, 3],
    C: [2, 3, 1],
  };

  const mapResponses: {
    [key in string]: { value: number; score: number };
  } = {
    X: { value: 0, score: 0 },
    Y: { value: 1, score: 3 },
    Z: { value: 2, score: 6 },
  };

  var score = 0;

  for (const line of fileToArray) {
    const chars = line.split(" ") as string[];

    if (chars.length == 0) continue;
    if (chars[0].length == 0 || chars[1].length == 0) continue;

    var response = mapResponses[chars[1]];

    score += response.score + scoreMap[chars[0]][response.value];
  }

  return score;
}
