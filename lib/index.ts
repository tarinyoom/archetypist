import { getEmbeddings } from "./embed";
import { cosineSimilarity, klDivergence, softMax } from "./statistics";
import { pairwiseCalculate, pairwiseReduce } from "./functional";

export async function compare(inputFragments: string[], referenceFragments: string[]): Promise<number[][]> {
    const inputEmbeddings = await getEmbeddings(inputFragments);
    const referenceEmbeddings = await getEmbeddings(referenceFragments);    

    // Create a matrix of embedding similarities,
    // with rows being input embeddings,
    // and columns being reference embeddings
    const similarityMatrix = pairwiseCalculate(inputEmbeddings, referenceEmbeddings, cosineSimilarity);

    // Calculate softmax of each row to find probability distribution for each input embedding
    const probabilities = similarityMatrix.map(softMax);

    return probabilities;
}

export function reduce(probabilities: number[][]): number {

    // Calculate divergences of each adjacent pair of input embeddings to compute divergence signal
    const divergences = pairwiseReduce(probabilities, klDivergence);

    // Calculate mean divergence
    return divergences.reduce((acc, val) => acc + val, 0)
        / divergences.reduce((acc, _) => acc + 1, 0);
}
