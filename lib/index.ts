import { getEmbeddings } from "./embed";
import { compare } from "./compare";
import { calculateEntropy } from "./entropy";

export async function complexity(inputFragments: string[], referenceFragments: string[]) {

    const inputEmbeddings = await getEmbeddings(inputFragments);
    const referenceEmbeddings = await getEmbeddings(referenceFragments);    
    
    const similarityMatrix = compare(inputEmbeddings, referenceEmbeddings);

    const rowMeans = similarityMatrix.map(row => {
        const sum = row.reduce((accumulator, value) => accumulator + value, 0);
        return sum / row.length;
    });

    const entropy = calculateEntropy(rowMeans);
    return entropy;
}
