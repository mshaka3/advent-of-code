import { join } from "path";

import { processFile } from "../../helpers/processFile";

const cubeKeyMap: { [key in string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};
export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  var result = 0;
  for (const line of fileAsArray) {
    const game = line.split(":");
    const id = Number(game[0].split(" ")[1]);
    const cubes: string[] = game[1].split(";");

    const possibleCube = cubes.every((cube) => {
      const cubeTypes = cube.trim().split(",");

      const result = cubeTypes.every((type) => {
        const number = type.match(/(\d+)/);
        if (!number) return false;

        const key = type.replace(/[0-9]/g, "").trim();

        return Number(number[0]) <= cubeKeyMap[key];
      });
      return result;
    });

    result += possibleCube ? Number(id) : 0;
  }
  console.log(result, "result");
  return result;
}

part1();
