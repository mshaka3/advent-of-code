import { join } from "path";
import { processFile } from "../helpers/processFile";
import { buildTree } from "./buildTree";
import { traversTree } from "./traversTree";

const totalSpace = 70000000;
const freeSpace = 30000000;

async function part2() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  const tree = await buildTree(fileAsArray);
  const dirMap = traversTree(tree);

  const rootSize = dirMap["root"];
  const unusedSpace = totalSpace - rootSize;
  const target =
    unusedSpace < freeSpace ? freeSpace - unusedSpace : unusedSpace;

  const atMost = Object.values(dirMap).filter((value) => value >= target);
  const result = atMost.reduce(
    (acc, val) => (acc = Math.min(val, acc)),
    Infinity,
  );

  console.log(result);
  return result;
}

part2();
