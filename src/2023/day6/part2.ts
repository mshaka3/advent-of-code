import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part2() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  const allowedTime = Number(
    fileAsArray[0]
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((char) => char.length != 0)
      .join(""),
  );
  const distToBreak = Number(
    fileAsArray[1]
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((char) => char.length != 0)
      .join(""),
  );

  var result = 1;
  var start = 0;
  var end = 0;

  for (var i = 1; i < allowedTime; i++) {
    const dist = (allowedTime - i) * i;
    if (dist > distToBreak) {
      start = i;
      break;
    }
  }
  for (var i = allowedTime; i > 0; i--) {
    const dist = (allowedTime - i) * i;
    if (dist > distToBreak) {
      end = i;
      break;
    }
  }
  console.log(start, end);
  console.log(end - start + 1);
  return end - start + 1;
}

part2();
