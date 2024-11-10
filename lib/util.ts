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
