export function flatten(array: any[]): any[] {
  var result = [];

  for (var item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
