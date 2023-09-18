import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function day4Part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var result = 0;

  for (const line of fileAsArray) {
    if (line.length == 0) continue;

    const [pair1, pair2] = line.split(",");

    const [left1, right1] = pair1.split("-");
    const [left2, right2] = pair2.split("-");

    if (Number(left1) >= Number(left2) || Number(right1) >= Number(right2)) {
      result++;
    } else if (
      Number(left2) >= Number(left1) ||
      Number(right2) >= Number(right1)
    ) {
      result++;
    }
  }

  console.log(result);
  return result;
}

day4Part1();
