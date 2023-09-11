export function promiseAll(values: any[]): Promise<any> {
  return new Promise(async function (resolve, reject) {
    var unresolved = values.length;
    if (unresolved == 0) resolve([]);

    var resolvedItems: any[] = [];

    for (const item of values) {
      try {
        const resolvedItem = await item;
        resolvedItems.push(resolvedItem);
        unresolved--;

        if (unresolved === 0) {
          resolve(resolvedItems);
        }
      } catch (error) {
        reject(error);
        return;
      }
    }
  });
}
