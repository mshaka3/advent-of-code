import { join } from "path";

import { processFile } from "../../helpers/processFile";

const cubeKeyMap: { [key in string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};
export async function part2() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var result = 0;
  for (const line of fileAsArray) {
    const game = line.split(":");
    const id = Number(game[0].split(" ")[1]);
    const cubes: string[] = game[1].split(";");

    const cubesMaxValue = new Map<string, number>();

    cubes.forEach((cube) => {
      const cubeTypes = cube.trim().split(",");
      cubeTypes.forEach((type) => {
        const number = type.match(/(\d+)/);
        if (!number) return false;
        const key = type.replace(/[0-9]/g, "").trim();

        var colorValue = cubesMaxValue.get(key) ?? 0;
        cubesMaxValue.set(key, Math.max(colorValue, Number(number[0])));
      });
    });
    var powerSet = 1;
    cubesMaxValue.forEach((value) => {
      powerSet *= value;
    });
    result += powerSet;
  }
  console.log(result, "result");
  return result;
}

part2();
