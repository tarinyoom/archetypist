import { getEmbeddings } from "./embed";
import { cosineSimilarity, klDivergence, softMax } from "./statistics";
import { pairwiseCalculate, pairwiseReduce } from "./util";

export async function complexity(inputFragments: string[], referenceFragments: string[]) {

    const inputEmbeddings = await getEmbeddings(inputFragments);
    const referenceEmbeddings = await getEmbeddings(referenceFragments);    

    // Create a matrix of embedding similarities,
    // with rows being input embeddings,
    // and columns being reference embeddings
    const similarityMatrix = pairwiseCalculate(inputEmbeddings, referenceEmbeddings, cosineSimilarity);

    // Calculate softmax of each row to find probability distribution for each input embedding
    const softMaxxed = similarityMatrix.map(softMax);

    // Calculate divergences of each adjacent pair of input embeddings to compute divergence signal
    const divergences = pairwiseReduce(softMaxxed, klDivergence);

    return divergences;
}
