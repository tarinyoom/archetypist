import { getEmbedding } from '../lib/cohere';

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
