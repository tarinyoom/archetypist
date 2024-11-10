import { applyToMatrixColumns } from "../lib/util";
import { pairwiseReduce } from "../lib/util";

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

function maxColumn(column: number[]): number[] {
    const maxValue = Math.max(...column);
    return column.map(() => maxValue);
}

describe('applyToMatrixColumns', () => {
    it('replaces each column with its maximum value', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        
        const expectedOutput = [
            [7, 8, 9],
            [7, 8, 9],
            [7, 8, 9]
        ];
        
        const result = applyToMatrixColumns(matrix, maxColumn);
        expect(result).toEqual(expectedOutput);
    });
});
