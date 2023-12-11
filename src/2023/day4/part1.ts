import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);
  var result = 0;

  for (const line of fileAsArray) {
    const getCards = line.split(":");
    const [winning, numbersUHave] = getCards[1].split("|");
    const set = new Set(winning.split(" "));
    console.log(numbersUHave);

    var firstCheck = true;
    var currentSum = 0;
    for (const number of numbersUHave.split(" ")) {
      if (number == "") continue;
      if (set.has(number)) {
        currentSum = firstCheck ? 1 : currentSum * 2;
        if (firstCheck) {
          firstCheck = false;
        }
      }
    }
    result += currentSum;
  }
  console.log(result);
  return result;
}

part1();
