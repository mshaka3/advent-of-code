import { join } from "path";
import { processFile } from "../helpers/processFile";

// this SOLVE  part 1 and part 2 just change the size of the characters
async function day6() {
  const numberOfDistinctChar = 14; // part was 4

  const filePath = join(__dirname, "input.txt");
  const { fileAsString } = await processFile(filePath);

  var left = 0;
  var charFreq = new Map<string, number>();
  for (var right = 0; right < fileAsString.length; right++) {
    var rightChar = fileAsString[right];

    while (charFreq.has(rightChar)) {
      const leftChar = fileAsString[left];
      charFreq.delete(leftChar);
      left++;
    }

    charFreq.set(rightChar, 1);

    if (charFreq.size == numberOfDistinctChar) {
      console.log(right + 1);
      break;
    }
  }
}

day6();
