import { getEmbeddings } from "./embed";
import { compare } from "./compare";
import { calculateEntropy, klDivergence, softMax } from "./entropy";
import { applyToMatrixColumns, pairwiseReduce } from "./util";

export async function complexity(inputFragments: string[], referenceFragments: string[]) {

    const inputEmbeddings = await getEmbeddings(inputFragments);
    const referenceEmbeddings = await getEmbeddings(referenceFragments);    

    // rows: input embeddings, columns: reference embeddings
    const similarityMatrix = compare(inputEmbeddings, referenceEmbeddings);
    const softMaxxed = similarityMatrix.map(softMax);
    const divergences = pairwiseReduce(softMaxxed, klDivergence);

    return divergences;
}
