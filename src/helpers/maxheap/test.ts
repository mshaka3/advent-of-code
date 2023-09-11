import { describe, expect, test } from "vitest";
import { maxHeap } from ".";

describe("test max heap functionality", () => {
  test("test add function", () => {
    var input = [4, 5, 2, 1, 3, 8, 7];
    var maxH = maxHeap();

    for (var i = 0; i < input.length; i++) {
      maxH.add(input[i]);
    }

    maxH.print();
    expect(maxH.getMax()).toEqual(8);
    expect(maxH.getMax()).toEqual(7);
  });
});
