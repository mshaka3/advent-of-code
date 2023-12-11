import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function day9() {
  const filePath = join(__dirname, "testinput.txt");
  const { fileAsArray } = await processFile(filePath);
  console.log(fileAsArray);
  var grid: string[][] = [["S"]];

  var currIndex = [0, 0];
  for (var line of fileAsArray) {
    const [dir, length] = line.split(" ");
    if (dir == "R" || dir == "L") {
      var colIndex = currIndex[1];
      var getCurrRow = grid[currIndex[0]];
      var currRow = [];
    }
    console.log(dir, length);
  }
}

day9();
