import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var sum = 0;
  for (const line of fileAsArray) {
    var first = false;
    var lineDigits: string[] = [];
    for (var i = 0; i < line.length; i++) {
      const isDigit = /\d/.test(line[i]);
      if (isDigit && !first) {
        first = true;
        lineDigits.push(line[i]);
        lineDigits.push(line[i]);
      } else if (isDigit) {
        lineDigits[1] = line[i];
      }
    }

    sum += Number(lineDigits[0] + lineDigits[1]);
  }

  return sum;
}
