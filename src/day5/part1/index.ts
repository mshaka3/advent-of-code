import { join } from "path";
import { fileToArray } from "../../helpers/fileToArray";
import { error } from "console";

export async function day5P1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsString } = await fileToArray(filePath);

  const [stackCreates, instrcutions] = fileAsString.split("\n\n");

  const stackMatrix = stackCreates
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split("").filter((_, idx) => idx % 4 == 1));

  const rows = stackMatrix.length;
  const cols = stackMatrix[0].length;
  const stackCols = Array(cols).fill("");

  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if (stackMatrix[row].length > col) {
        const char = stackMatrix[row][col];
        if (char != " ") {
          stackCols[col] += char;
        }
      }
    }
  }

  // READ THE INSTRCUTIONS

  for (const line of instrcutions.split("\n")) {
    if (line.length == 0) continue;
    const twoDigitNumber = line[6] != " ";

    const stackNumbers = twoDigitNumber
      ? Number(line[5] + line[6])
      : Number(line[5]);

    const source = Number(line[twoDigitNumber ? 13 : 12]) - 1;
    const target = Number(line[twoDigitNumber ? 18 : 17]) - 1;

    moveCreate(stackNumbers, source, target);
  }

  // DO INSTRCUTION

  function moveCreate(stackNumbers: number, source: number, target: number) {
    const sourceCreate = stackCols[source];
    const targetCreate = stackCols[target];

    var updateTargetCreate = "";
    for (var i = stackNumbers - 1; i >= 0; i--) {
      updateTargetCreate += sourceCreate[i];
    }

    stackCols[source] = sourceCreate.slice(stackNumbers);
    stackCols[target] = updateTargetCreate + targetCreate;
  }

  console.log(stackCols);
  var result = stackCols.reduce((acc, col) => (acc += col[0]), "");
  console.log(result);
  return result;
}

day5P1();
