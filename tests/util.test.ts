import { applyToMatrixColumns } from "../lib/util";
import { pairwiseReduce } from "../lib/util";

describe('pairwiseReduce', () => {
    test('reduces an array of numbers by summing each adjacent pair', () => {
        const numbers = [1, 2, 3, 4];
        const sum = (a: number, b: number) => a + b;
        const result = pairwiseReduce(numbers, sum);
        expect(result).toEqual([3, 5, 7]); // (1+2, 2+3, 3+4)
    });

    test('reduces an array of numbers by multiplying each adjacent pair', () => {
        const numbers = [2, 3, 4, 5];
        const multiply = (a: number, b: number) => a * b;
        const result = pairwiseReduce(numbers, multiply);
        expect(result).toEqual([6, 12, 20]); // (2*3, 3*4, 4*5)
    });

    test('works with an array of strings by concatenating each adjacent pair', () => {
        const words = ['hello', 'world', 'typescript'];
        const concat = (a: string, b: string) => `${a}-${b}`;
        const result = pairwiseReduce(words, concat);
        expect(result).toEqual(['hello-world', 'world-typescript']);
    });

    test('throws an error if array has fewer than 2 elements', () => {
        const singleElement = [42];
        const sum = (a: number, b: number) => a + b;
        expect(() => pairwiseReduce(singleElement, sum)).toThrow('Array must have at least two elements.');
    });

    test('returns correct result for an array of booleans with an AND operation', () => {
        const bools = [true, false, true, true];
        const andOperation = (a: boolean, b: boolean) => a && b;
        const result = pairwiseReduce(bools, andOperation);
        expect(result).toEqual([false, false, true]); // (true && false, false && true, true && true)
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
