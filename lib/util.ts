export function applyToMatrixColumns(matrix: number[][], columnFunction: (column: number[]) => number[]): number[][] {
    const numColumns = matrix[0]?.length || 0;
    const columns = Array.from({ length: numColumns }, (_, colIndex) =>
        matrix.map(row => row[colIndex])
    );

    const transformedColumns = columns.map(column => columnFunction(column));
    const resultMatrix = matrix.map((_, rowIndex) =>
        transformedColumns.map(column => column[rowIndex])
    );

    return resultMatrix;
}