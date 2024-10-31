export function calculateEntropy(distribution: number[]): number {
    const total = distribution.reduce((sum, value) => sum + value, 0);

    if (total === 0) {
        throw new Error("The total of the distribution cannot be zero.");
    }

    return -1.0 * distribution.reduce((accumulator, value) => {
        const probability = value / total;
        return accumulator + (probability > 0 ? probability * Math.log2(probability) : 0);
    }, 0);   
}

export function softMax(distribution: number[]): number[] {
    const max = Math.max(...distribution); // Find max to prevent overflow
    const expValues = distribution.map(value => Math.exp(value - max));

    const sumExpValues = expValues.reduce((sum, value) => sum + value, 0);

    return expValues.map(value => value / sumExpValues);
}
