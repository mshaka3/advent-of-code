import { join } from "path";
import { processFile } from "../helpers/processFile";
import { buildTree } from "./buildTree";
import { traversTree } from "./traversTree";

async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);

  const tree = await buildTree(fileAsArray);
  const dirMap = traversTree(tree);

  const atMost = Object.values(dirMap).filter((value) => value <= 100000);
  const result = atMost.reduce((acc, val) => (acc += val), 0);

  console.log(result);
  return result;
}

part1();
