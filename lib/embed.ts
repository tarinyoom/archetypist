import { CohereClientV2 } from "cohere-ai";

const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set.");
}

const cohere = new CohereClientV2({
    token: apiKey,
});

async function getEmbeddings(inputs: string[]): Promise<number[][]> {
    if (inputs.length == 0) {
        return [];
    }

    if (inputs.length > 96) {
        throw new Error("Too many inputs: a maximum of 96 input strings are allowed.");
    }

    for (const input of inputs) {
        if (input.length > 512) {
            throw new Error("Input exceeds maximum length: each input must be 512 characters or fewer.");
        }
    }

    const response = await cohere.embed({
        texts: inputs,
        model: "embed-english-v3.0",
        inputType: "classification",
        embeddingTypes: ["float"]
    });

    const embeddings = response.embeddings?.float;
    if (Array.isArray(embeddings) && embeddings.length > 0) {
        return embeddings;
    } else {
        throw new Error("Failed to get embeddings.");
    }
}

async function getEmbedding(input: string): Promise<number[]> {
    const embeddings = await getEmbeddings([input]);
    return embeddings[0];
}

export { getEmbedding, getEmbeddings };
