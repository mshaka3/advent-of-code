import { join } from "path";

import { processFile } from "../../helpers/processFile";

export async function part1() {
  const filePath = join(__dirname, "testinput.txt");

  const { fileAsArray } = await processFile(filePath);

  var trees: number[][] = [];
  for (const line of fileAsArray) {
    trees.push([...line.split("").map((v) => parseInt(v))]);
  }

  console.log(trees.join("\n"));
  const rows = trees.length;
  const cols = trees[0].length;

  console.log(trees.length);
  var visited = Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(false));

  var result = 0;
  for (var row = 0; row < rows; row++) {
    result += dfs(row, 0, -1, [0, 1]);
    result += dfs(row, cols - 1, -1, [0, -1]);
  }

  for (var col = 0; col < cols; col++) {
    result += dfs(0, col, -1, [1, 0]);
    result += dfs(rows - 1, col, -1, [-1, 0]);
  }

  console.log(visited);
  console.log(result);
  function dfs(
    row: number,
    col: number,
    prevHeight: number,
    dir: [number, number],
  ): number {
    if (row >= rows || row < 0 || col >= cols || col < 0) {
      return 0;
    }

    const currentHeight = Math.max(prevHeight, trees[row][col]);
    if (prevHeight >= trees[row][col] || visited[row][col]) {
      return 0 + dfs(row + dir[0], col + dir[1], currentHeight, dir);
    } else {
      visited[row][col] = true;
      return 1 + dfs(row + dir[0], col + dir[1], currentHeight, dir);
    }
  }
}

part1();
