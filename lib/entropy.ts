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
