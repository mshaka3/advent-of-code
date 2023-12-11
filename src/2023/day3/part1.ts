import { join } from "path";
import { processFile } from "../../helpers/processFile";
import { isNumber } from "../../helpers/isNumber";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  const matrixInput = [];
  for (const line of fileAsArray) {
    const arr = line.split("");
    matrixInput.push(arr);
  }

  const rows = matrixInput.length;
  const cols = matrixInput[0].length;
  var result = 0;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      const char = matrixInput[row][col];
      if (!isNumber(char)) continue;

      var number = char;
      var start = col;
      while (++col < cols) {
        if (isNumber(matrixInput[row][col])) {
          number += matrixInput[row][col];
        } else {
          break;
        }
      }

      var end = col - 1;

      if (
        checkAdj(row, start - 1, matrixInput) ||
        checkAdj(row - 1, start - 1, matrixInput) ||
        checkAdj(row + 1, start - 1, matrixInput) ||
        checkAdj(row, end + 1, matrixInput) ||
        checkAdj(row - 1, end + 1, matrixInput) ||
        checkAdj(row + 1, end + 1, matrixInput)
      ) {
        result += Number(number);
        continue;
      }

      for (var i = start; i <= end; i++) {
        if (
          checkAdj(row + 1, i, matrixInput) ||
          checkAdj(row - 1, i, matrixInput)
        ) {
          result += Number(number);
          break;
        }
      }
    }
  }

  console.log(result);
  return result;

  function checkAdj(row: number, col: number, matrix: string[][]): boolean {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      matrix[row][col] == "."
    ) {
      return false;
    }

    return true;
  }
}

part1();
