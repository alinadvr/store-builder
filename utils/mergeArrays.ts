export function mergeArrays(array: string[][]) {
  const mergedArray = [] as string[];
  array.forEach((subarr) => subarr.forEach((el) => mergedArray.push(el)));

  return mergedArray;
}
