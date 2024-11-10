export function pairwiseReduce<T, U>(arr: T[], fn: (a: T, b: T) => U): U[] {
    if (arr.length < 2) {
        throw new Error("Array must have at least two elements.");
    }

    const result: U[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
        result.push(fn(arr[i], arr[i + 1]));
    }
    return result;
}
