export function cosineSimilarity(u: number[], v: number[]): number {
    if (u.length !== v.length) {
        throw new Error("Vectors must be of the same length");
    }

    let dotProduct = 0;
    let magnitudeU = 0;
    let magnitudeV = 0;

    for (let i = 0; i < u.length; i++) {
        dotProduct += u[i] * v[i];
        magnitudeU += u[i] * u[i];
        magnitudeV += v[i] * v[i];
    }

    const denominator = Math.sqrt(magnitudeU) * Math.sqrt(magnitudeV);
    if (denominator === 0) {
        throw new Error("One of the vectors is zero, so cosine similarity is undefined");
    }

    return dotProduct / denominator;
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
