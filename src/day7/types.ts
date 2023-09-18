export interface Node {
  name: string;
  files: number[];
  parent: Node | null;
  dir: { [key in string]: Node };
}
