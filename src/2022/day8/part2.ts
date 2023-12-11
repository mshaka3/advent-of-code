import { join } from "path";

import { processFile } from "../../helpers/processFile";

export async function part2() {
  const filePath = join(__dirname, "testinput.txt");

  const { fileAsArray } = await processFile(filePath);

  var trees: number[][] = [];
  for (const line of fileAsArray) {
    trees.push([...line.split("").map((v) => parseInt(v))]);
  }

  const rows = trees.length;
  const cols = trees[0].length;

  var visited = Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(false));

  console.log(visited);
  console.log(trees);
  var result = 0;
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      dfs(row, col, -1);
    }
  }

  console.log(result);
  function dfs(row: number, col: number, prevHeight: number): number {
    if (row >= rows || row < 0 || col >= cols || col < 0 || visited[row][col]) {
      return 0;
    }

    const currentHeight = Math.max(prevHeight, trees[row][col]);
    visited[row][col] = true;

    const result =
      dfs(row + 1, col, currentHeight) +
      dfs(row - 1, col, currentHeight) +
      dfs(row, col - 1, currentHeight) +
      dfs(row, col + 1, currentHeight);

    visited[row][col] = false;
    return result;
  }
}

part2();
