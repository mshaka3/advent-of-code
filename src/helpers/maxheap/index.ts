import { s } from "vitest/dist/reporters-2ff87305";

export function maxHeap() {
  var values: number[] = [];

  function parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  function leftChild(index: number) {
    return index * 2 + 1;
  }
  function rightChild(index: number) {
    return index * 2 + 2;
  }

  function isLeaf(index: number) {
    return index >= Math.floor(values.length / 2) && index <= values.length - 1;
  }

  function swap(index1: number, index2: number) {
    [values[index1], values[index2]] = [values[index2], values[index1]];
  }

  function add(value: number) {
    values.push(value);
    heapifyUp(values.length - 1);
  }

  function heapifyUp(index: number) {
    var parentIndex = parent(index);

    while (index > 0 && values[index] > values[parentIndex]) {
      swap(index, parentIndex);
      index = parentIndex;
      parentIndex = parent(parentIndex);
    }
  }

  function heapifyDown(index: number) {
    if (isLeaf(index)) return;

    var leftIndex = leftChild(index);
    var rightIndex = rightChild(index);
    var largestIndex = index;

    if (values[leftIndex] > values[largestIndex]) {
      largestIndex = leftIndex;
    }

    if (values[rightIndex] > values[largestIndex]) {
      largestIndex = rightIndex;
    }

    if (largestIndex != index) {
      swap(index, largestIndex);
      heapifyDown(largestIndex);
    }
  }

  function getMax(): number | undefined {
    if (values.length == 0) {
      console.error("Heap is empty");
      return undefined;
    }

    var top = values[0];
    var end = values.pop() as number;

    values[0] = end;

    heapifyDown(0);

    return top;
  }

  function buildHeap(array: number[]) {
    values = array;
    for (var i = Math.floor(values.length / 2); i >= 0; i--) {
      heapifyDown(i);
    }
  }
  function print() {
    var i = 0;

    while (!isLeaf(i)) {
      console.log("PARENT:", values[i]);
      console.log("LEFT CHILD:", values[leftChild(i)]);
      console.log("RIGHT CHILD:", values[rightChild(i)]);
      i++;
    }
  }

  return { add, getMax, buildHeap, print };
}
