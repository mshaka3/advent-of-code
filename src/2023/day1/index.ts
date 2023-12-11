import { join } from "path";
import { processFile } from "../../helpers/processFile";

const lookup: { [key in string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export async function day1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var sum = 0;
  for (const line of fileAsArray) {
    var first = false;
    var lineDigits: string[] = [];

    for (var right = 0; right < line.length; right++) {
      const isDigit = /\d/.test(line[right]);

      if (isDigit) {
        if (!first) {
          lineDigits.push(line[right]);
          lineDigits.push(line[right]);
          first = true;
        } else {
          lineDigits[1] = line[right];
        }
        continue;
      }
      var indexOfStr = -1;
      for (const num of Object.keys(lookup)) {
        const regx = new RegExp("/^" + line.substring(right) + "$/");
        console.log(regx);
        const findNum = line.search(
          new RegExp("/^" + line.substring(right) + "$/"),
        );
        console.log(findNum, indexOfStr);
        if (indexOfStr != -1 && indexOfStr <= findNum) continue;

        indexOfStr = findNum;
        if (!first) {
          lineDigits.push(lookup[num]);
          lineDigits.push(lookup[num]);
          first = true;
        } else {
          lineDigits[1] = lookup[num];
        }
        continue;
      }
    }
    console.log(lineDigits, "lineDigits", line);

    sum += Number(lineDigits[0] + lineDigits[1]);
  }
  console.log(sum);
}

day1();
