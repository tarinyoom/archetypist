import { getEmbeddings } from "./embed";
import { cosineSimilarity, klDivergence, softMax } from "./statistics";
import { pairwiseCalculate, pairwiseReduce } from "./functional";

async function getFragmentProbabilities(inputFragments: string[], referenceFragments: string[]): Promise<number[][]> {
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

export async function getDivergenceSignal(inputFragments: string[], referenceFragments: string[]): Promise<number[]> {

    const probabilities = await getFragmentProbabilities(inputFragments, referenceFragments);

    // Calculate divergences of each adjacent pair of input embeddings to compute divergence signal
    const divergenceSignal = pairwiseReduce(probabilities, klDivergence);

    return divergenceSignal;
}

export async function getTotalDivergence(inputFragments: string[], referenceFragments: string[]): Promise<number> {
    const signal = await getDivergenceSignal(inputFragments, referenceFragments);
    return signal.reduce((acc, val) => acc + val, 0) / signal.reduce((acc, _) => acc + 1, 0);
}
