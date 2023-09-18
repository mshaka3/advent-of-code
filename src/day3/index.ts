import { readFile } from "fs/promises";
import { join } from "path";
import { processFile } from "../helpers/processFile";

export async function day3() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var sum = 0;
  var groupLines = [];

  for (const line of fileAsArray) {
    if (line.length == 0) continue;

    var lineChars = [];
    for (var i = 0; i < line.length; i++) {
      var char = line[i] as string;
      lineChars.push(char);
    }

    groupLines.push(lineChars);

    console.log("before", groupLines);
    if (groupLines.length == 3) {
      while (groupLines.length > 1) {
        const firstLine: string[] = groupLines.pop() ?? [];
        const secoundLine: string[] = groupLines.pop() ?? [];

        const result = secoundLine.filter((char) => firstLine.includes(char));
        groupLines.push(result);
      }

      console.log(groupLines);
      var charCode = groupLines[0][0].charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        sum += charCode - 65 + 27;
      } else {
        sum += charCode - 96;
      }

      groupLines = [];
    }
  }

  console.log("sum", sum);
  return sum;
}
day3();
