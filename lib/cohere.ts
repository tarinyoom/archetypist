import { CohereClient } from "cohere-ai";

const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set.");
}

const cohere = new CohereClient({
    token: apiKey,
});

async function getEmbedding(input: string): Promise<number[]> {
    const response = await cohere.embed({
        texts: [input], // Embedding expects an array of strings
    });

    // Check if the response.embeddings is an array and contains elements
    if (Array.isArray(response.embeddings) && response.embeddings.length > 0) {
        return response.embeddings[0]; // Return the first embedding
    } else {
        throw new Error("Failed to get embeddings.");
    }
}

export { getEmbedding };
