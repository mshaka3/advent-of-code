import { Node } from "./types";

export async function buildTree(lines: string[]) {
  var head = createNode("root", null);
  var curr = head;

  for (const line of lines.slice(1)) {
    if (line.startsWith("$")) {
      const [_, command, dir] = line.split(" ");

      if (command == "cd") {
        if (dir == "..") {
          curr = curr.parent ?? curr; // should not happen but if it did you should stay where you are
        } else {
          curr = curr.dir[`${curr.name}/${dir}`];
        }
      }
    } else {
      var [val, name] = line.split(" ");
      if (val == "dir") {
        var dirName = `${curr.name}/${name}`;
        var node = createNode(dirName, curr);
        curr.dir[dirName] = node;
      } else {
        const numberSize = Number(val);
        if (!isNaN(numberSize)) {
          curr.files.push(numberSize);
        }
      }
    }
  }

  return head;
}

function createNode(name: string, parent: Node | null): Node {
  return { name, parent, files: [], dir: {} };
}
