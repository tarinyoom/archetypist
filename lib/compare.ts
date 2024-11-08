function cosineSimilarity(u: number[], v: number[]): number {
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

// Each row contains similarities for a given input embedding
// Each column contains similarities for a given reference embedding
export function compare(inputEmbeddings: number[][], referenceEmbeddings: number[][]): number[][] {
    return inputEmbeddings.map(u =>
        referenceEmbeddings.map(v => cosineSimilarity(u, v))
    );
}
