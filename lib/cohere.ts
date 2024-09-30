import { CohereClientV2 } from "cohere-ai";

const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set.");
}

const cohere = new CohereClientV2({
    token: apiKey,
});

async function getEmbedding(input: string): Promise<number[]> {
    const response = await cohere.embed({
        texts: [input], // Embedding expects an array of strings
        model:"embed-english-v3.0",
        inputType:"classification",
        embeddingTypes:["float"]
    });

    // Safely access the embeddings
    const embeddings = response.embeddings?.float; // Use optional chaining

    // Check if embeddings is an array and contains elements
    if (Array.isArray(embeddings) && embeddings.length > 0) {
        return embeddings[0]; // Return the first embedding
    } else {
        throw new Error("Failed to get embeddings.");
    }
}

export { getEmbedding };
