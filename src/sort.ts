const mergeSort = (input: number[]) => {
  if (input.length < 2) return input;

  const merge = (left: number[], right: number[]) => {
    const result: number[] = [];

    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
  };

  const middle = Math.floor(input.length / 2);
  const left = input.slice(0, middle);
  const right = input.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
};

console.log(
  'mergeSort([10, 4, 46, 3, -5, 12, 53, 28, 1, 9, 0])',
  mergeSort([10, 4, 46, 3, -5, 12, 53, 28, 1, 9, 0]),
);
console.log('mergeSort([53, 28, 1, 9, 0])', mergeSort([53, 28, 1, 9, 0]));
console.log('mergeSort([9, 0])', mergeSort([9, 0]));
console.log('mergeSort([9])', mergeSort([9]));
console.log('mergeSort([])', mergeSort([]));
