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

export function pairwiseCalculate<T, U>(arr1: T[], arr2: T[], fn: (a: T, b: T) => U): U[][] {
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length.");
    }

    const result: U[][] = [];

    for (let i = 0; i < arr1.length; i++) {
        const row: U[] = [];
        for (let j = 0; j < arr2.length; j++) {
            row.push(fn(arr1[i], arr2[j]));
        }
        result.push(row);
    }

    return result;
}
