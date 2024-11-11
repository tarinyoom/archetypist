import { getEmbedding, getEmbeddings } from '../lib/embed';

describe('Cohere API basic check', () => {
    test('getEmbedding should return an embedding of correct size with non-trivial values', async () => {
        const embedding = await getEmbedding('hello');

        // Expect embedding to have certain size
        const expectedSize = 1024;
        expect(embedding.length).toBe(expectedSize);

        // Expect embedding to be nontrivial
        const maxValue = Math.max(...embedding);
        const minValue = Math.min(...embedding);
        expect(maxValue).toBeGreaterThan(minValue);
    });
});

describe('getEmbeddings Safeguards', () => {
    test('should map an empty array to an empty array', async () => {
        const inputs: string[] = []
        const result = await getEmbeddings(inputs);
        expect(result).toEqual([]);
    });

    test('should throw an error if more than 96 inputs are provided', async () => {
        const inputs = new Array(97).fill("valid input"); // Create an array with 97 valid inputs
        await expect(getEmbeddings(inputs)).rejects.toThrow("Too many inputs: a maximum of 96 input strings are allowed.");
    });

    test('should throw an error if any input exceeds 512 characters', async () => {
        const validInput = "a".repeat(512); // Valid input of exactly 512 characters
        const invalidInput = "b".repeat(513); // Invalid input of 513 characters
        const inputs = [validInput, invalidInput]; // One valid, one invalid input
        await expect(getEmbeddings(inputs)).rejects.toThrow("Input exceeds maximum length: each input must be 512 characters or fewer.");
    });

    test('should succeed with valid inputs', async () => {
        const validInputs = [
            "This is a valid input.",
            "Here is another valid input."
        ];
        await expect(getEmbeddings(validInputs)).resolves.not.toThrow(); // Expect no errors
    });
});
