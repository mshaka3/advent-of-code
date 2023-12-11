import { join } from "path";
import { processFile } from "../../helpers/processFile";
import { constrainedMemory } from "process";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsString } = await processFile(filePath);

  var result = Infinity;

  const splitByLines = fileAsString.split("\n\n");

  const seeds = splitByLines[0]
    .split(":")[1]
    .split(" ")
    .filter((seed) => seed != "");

  const groupsMap = splitByLines.slice(1).map((line) =>
    line
      .split(":")[1]
      .split("\n")
      .filter((line) => line != ""),
  );

  for (const seed of seeds) {
    var seedNumber = Number(seed);
    for (var i = 0; i < groupsMap.length; i++) {
      for (var j = 0; j < groupsMap[i].length; j++) {
        const lines = groupsMap[i][j].split(" ");
        if (inRange(seedNumber, Number(lines[1]), Number(lines[2]))) {
          seedNumber = Number(lines[0]) + (seedNumber - Number(lines[1]));
          break;
        }
      }
    }

    result = Math.min(seedNumber, result);
  }
  console.log(result);

  function inRange(target: number, source: number, range: number) {
    return source <= target && target <= source + range;
  }
}

part1();
