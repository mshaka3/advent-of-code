import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  const timeArr = fileAsArray[0]
    .split(":")[1]
    .split(" ")
    .filter((char) => char.length != 0)
    .map((char) => Number(char));
  const distArr = fileAsArray[1]
    .split(":")[1]
    .split(" ")
    .filter((char) => char.length != 0)
    .map((char) => Number(char));

  var result = 1;

  for (var race = 0; race < timeArr.length; race++) {
    const allowedTime = timeArr[race];
    const distToBreak = distArr[race];
    var waysToWin = 0;

    var maxTime = allowedTime - 1;
    while (maxTime > 0) {
      const dist = (allowedTime - maxTime) * maxTime;
      if (dist > distToBreak) {
        waysToWin++;
      }
      maxTime--;
    }

    result *= waysToWin;
  }
  console.log(result);
}
part1();
