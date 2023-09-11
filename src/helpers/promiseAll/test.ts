import { describe, test, expect } from "vitest";
import { promiseAll } from ".";

describe("promiseAll function suite ", () => {
  test("test empty array", async () => {
    const res = await promiseAll([]);
    expect(res).toEqual([]);
  });

  test("test non promise value", async () => {
    const result = await promiseAll([42]);
    expect(result).toEqual([42]);
  });

  test("test one  promise value", async () => {
    const result = await promiseAll([Promise.resolve(2)]);
    expect(result).toEqual([2]);
  });
});
