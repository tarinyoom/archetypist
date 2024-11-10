import { getEmbeddings } from "./embed";
import { cosineSimilarity } from "./compare";
import { klDivergence, softMax } from "./statistics";
import { pairwiseCalculate, pairwiseReduce } from "./util";

export async function complexity(inputFragments: string[], referenceFragments: string[]) {

    const inputEmbeddings = await getEmbeddings(inputFragments);
    const referenceEmbeddings = await getEmbeddings(referenceFragments);    

    // rows: input embeddings, columns: reference embeddings
    const similarityMatrix = pairwiseCalculate(inputEmbeddings, referenceEmbeddings, cosineSimilarity);
    const softMaxxed = similarityMatrix.map(softMax);
    const divergences = pairwiseReduce(softMaxxed, klDivergence);

    return divergences;
}
