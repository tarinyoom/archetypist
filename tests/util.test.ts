import { applyToMatrixColumns } from "../lib/util";

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
