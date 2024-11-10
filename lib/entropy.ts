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

export function klDivergence(P: number[], Q: number[]): number {
    if (P.length !== Q.length) {
        throw new Error("P and Q must have the same length.");
    }

    let divergence = 0;

    for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const q = Q[i];

        if (p < 0 || q < 0) {
            throw new Error("P and Q must only contain non-negative values.");
        }

        // Ignore terms where p is 0 (no contribution to KL divergence)
        if (p > 0) {
            // Prevent division by zero or log of zero by checking q > 0
            if (q > 0) {
                divergence += p * Math.log(p / q);
            } else {
                throw new Error("Q cannot contain zero values if corresponding P[i] is non-zero.");
            }
        }
    }

    return divergence;
}

export function softMax(distribution: number[]): number[] {
    const max = Math.max(...distribution); // Find max to prevent overflow
    const expValues = distribution.map(value => Math.exp(value - max));

    const sumExpValues = expValues.reduce((sum, value) => sum + value, 0);

    return expValues.map(value => value / sumExpValues);
}
