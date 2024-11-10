import { pairwiseReduce, pairwiseCalculate } from "../lib/util";

describe('pairwiseReduce', () => {
    test('throws an error if array has fewer than two elements', () => {
        expect(() => pairwiseReduce([1], (a, b) => a + b)).toThrow("Array must have at least two elements.");
    });

    test('reduces an array of numbers by summing adjacent pairs', () => {
        const arr = [1, 2, 3, 4];
        const result = pairwiseReduce(arr, (a, b) => a + b);
        expect(result).toEqual([3, 5, 7]); // [1+2, 2+3, 3+4]
    });

    test('reduces an array of numbers by multiplying adjacent pairs', () => {
        const arr = [2, 3, 4, 5];
        const result = pairwiseReduce(arr, (a, b) => a * b);
        expect(result).toEqual([6, 12, 20]); // [2*3, 3*4, 4*5]
    });

    test('reduces an array of strings by concatenating adjacent pairs', () => {
        const arr = ["a", "b", "c", "d"];
        const result = pairwiseReduce(arr, (a, b) => a + b);
        expect(result).toEqual(["ab", "bc", "cd"]); // ["a"+"b", "b"+"c", "c"+"d"]
    });

    test('reduces an array of objects by merging adjacent pairs', () => {
        const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
        const result = pairwiseReduce(arr, (a, b) => ({ ...a, ...b }));
        expect(result).toEqual([{ x: 2 }, { x: 3 }]); // Each pairwise merge overwrites with values from `b`
    });

    test('reduces an array of booleans with logical OR of adjacent pairs', () => {
        const arr = [true, false, false, true];
        const result = pairwiseReduce(arr, (a, b) => a || b);
        expect(result).toEqual([true, false, true]); // [true || false, false || false, false || true]
    });

    test('reduces an array of mixed types by applying a custom function', () => {
        const arr = [1, "2", true, null];
        const result = pairwiseReduce(arr, (a, b) => `${a}-${b}`);
        expect(result).toEqual(["1-2", "2-true", "true-null"]); // Combines each pair as a string with "-"
    });
});

describe('pairwiseCalculate', () => {

    // Test: Basic functionality with addition
    test('calculates pairwise sum of two arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const sum = (a: number, b: number): number => a + b;

        const result = pairwiseCalculate(arr1, arr2, sum);

        expect(result).toEqual([
            [5, 6, 7],
            [6, 7, 8],
            [7, 8, 9]
        ]);
    });

    // Test: Handling different operation - multiplication
    test('calculates pairwise product of two arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const multiply = (a: number, b: number): number => a * b;

        const result = pairwiseCalculate(arr1, arr2, multiply);

        expect(result).toEqual([
            [4, 5, 6],
            [8, 10, 12],
            [12, 15, 18]
        ]);
    });

    // Test: Edge case with empty arrays
    test('throws error when arrays have different lengths', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5];

        const sum = (a: number, b: number): number => a + b;

        expect(() => pairwiseCalculate(arr1, arr2, sum)).toThrowError('Arrays must have the same length.');
    });

    // Test: Edge case with empty arrays
    test('returns empty array when both arrays are empty', () => {
        const arr1: number[] = [];
        const arr2: number[] = [];
        const sum = (a: number, b: number): number => a + b;

        const result = pairwiseCalculate(arr1, arr2, sum);

        expect(result).toEqual([]);
    });

    // Test: Handling arrays with different data types (strings)
    test('calculates pairwise concatenation of two arrays of strings', () => {
        const arr1 = ['a', 'b', 'c'];
        const arr2 = ['x', 'y', 'z'];
        const concatenate = (a: string, b: string): string => a + b;

        const result = pairwiseCalculate(arr1, arr2, concatenate);

        expect(result).toEqual([
            ['ax', 'ay', 'az'],
            ['bx', 'by', 'bz'],
            ['cx', 'cy', 'cz']
        ]);
    });

    // Test: Handling arrays of length 1
    test('calculates pairwise sum of single element arrays', () => {
        const arr1 = [1];
        const arr2 = [2];
        const sum = (a: number, b: number): number => a + b;

        const result = pairwiseCalculate(arr1, arr2, sum);

        expect(result).toEqual([[3]]);
    });
});
