import { CohereClientV2 } from "cohere-ai";

const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set.");
}

const cohere = new CohereClientV2({
    token: apiKey,
});

async function getEmbeddings(inputs: string[]): Promise<number[][]> {

    // Safeguards for limits defined in cohere API reference
    if (inputs.length > 96) {
        throw new Error("Too many inputs: a maximum of 96 input strings are allowed.");
    }

    for (const input of inputs) {
        if (input.length > 512) {
            throw new Error("Input exceeds maximum length: each input must be 512 characters or fewer.");
        }
    }

    const response = await cohere.embed({
        texts: inputs, // Embedding expects an array of strings
        model: "embed-english-v3.0",
        inputType: "classification",
        embeddingTypes: ["float"]
    });

    // Safely access the embeddings
    const embeddings = response.embeddings?.float; // Use optional chaining

    // Check if embeddings is an array and contains elements
    if (Array.isArray(embeddings) && embeddings.length > 0) {
        return embeddings; // Return all embeddings
    } else {
        throw new Error("Failed to get embeddings.");
    }
}

async function getEmbedding(input: string): Promise<number[]> {
    // Call getEmbeddings with a single string wrapped in an array
    const embeddings = await getEmbeddings([input]);
    
    // Return the first embedding
    return embeddings[0];
}

export { getEmbedding, getEmbeddings };
