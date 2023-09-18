import { Node } from "./types";

var dirMap: { [key in string]: number } = {};

export function traversTree(head: Node) {
  dfs(head);
  return dirMap;

  function dfs(node: Node) {
    if (!node) return 0;

    var currSize = 0;
    for (var file of node.files) {
      currSize += file;
    }

    var dirs = node.dir;
    for (const dir of Object.keys(dirs)) {
      const curr = dirs[dir];
      currSize += dfs(curr);
    }

    dirMap[node.name] = currSize;
    return currSize;
  }
}
