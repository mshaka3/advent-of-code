import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part2() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);
  var result = 0;

  var cardsCopies = [];
  for (const line of fileAsArray) {
    const getCards = line.split(":");
    const [winning, numbersUHave] = getCards[1].split("|");
    const set = new Set(winning.split(" "));

    var matches = 0;
    for (const number of numbersUHave.split(" ")) {
      if (number == "") continue;
      if (set.has(number)) {
        matches++;
      }
    }

    var currentCopies = 0;
    if (cardsCopies.length > 0) {
      for (var i = 0; i < cardsCopies.length; i++) {
        if (cardsCopies[i] > 0) {
          cardsCopies[i]--;
          result += 1;
          currentCopies++;
        }
      }
    }

    result++;
    if (matches > 0) {
      cardsCopies.push(matches);
      for (var i = 0; i < currentCopies; i++) {
        cardsCopies.push(matches);
      }
    }
  }

  console.log(result);
  return result;
}

part2();
