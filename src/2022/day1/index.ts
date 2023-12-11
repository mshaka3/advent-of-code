import { maxHeap } from "../../helpers/maxheap";

export function day1(input: string) {
  var toArray = input.split("\n\n").map((group) => group.split("\n"));
  var result = 0;

  var maxH = maxHeap();
  for (var i = 0; i < toArray.length; i++) {
    var totalSum = toArray[i].reduce((acc, val) => acc + Number(val), 0);
    maxH.add(totalSum);
  }

  for (var i = 0; i < 3; i++) {
    const max = maxH.getMax() ?? 0;
    console.log(max);
    result += max;
  }
  console.log(result);
}
