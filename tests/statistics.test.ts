import { klDivergence, softMax, cosineSimilarity } from "../lib/statistics";

describe('cosineSimilarity', () => {

    // Test: Basic similarity between two identical vectors
    test('should return 1 for identical vectors', () => {
        const u = [1, 2, 3];
        const v = [1, 2, 3];
        const result = cosineSimilarity(u, v);
        expect(result).toBeCloseTo(1, 5);
    });

    // Test: Cosine similarity of two orthogonal vectors (should be 0)
    test('should return 0 for orthogonal vectors', () => {
        const u = [1, 0, 0];
        const v = [0, 1, 0];
        const result = cosineSimilarity(u, v);
        expect(result).toBeCloseTo(0, 5);
    });

    // Test: Cosine similarity of two opposite vectors (should be -1)
    test('should return -1 for opposite vectors', () => {
        const u = [1, 2, 3];
        const v = [-1, -2, -3];
        const result = cosineSimilarity(u, v);
        expect(result).toBeCloseTo(-1, 5);
    });

    // Test: Cosine similarity with one zero vector (should throw error)
    test('should throw error for one zero vector', () => {
        const u = [0, 0, 0];
        const v = [1, 2, 3];
        expect(() => cosineSimilarity(u, v)).toThrow("One of the vectors is zero, so cosine similarity is undefined");
    });

    // Test: Cosine similarity of two random vectors
    test('should return a value between -1 and 1 for random vectors', () => {
        const u = [1, 2, 3];
        const v = [4, 5, 6];
        const result = cosineSimilarity(u, v);
        expect(result).toBeGreaterThanOrEqual(-1);
        expect(result).toBeLessThanOrEqual(1);
    });

    // Test: Cosine similarity with vectors of different lengths (should throw error)
    test('should throw error when vectors have different lengths', () => {
        const u = [1, 2];
        const v = [1, 2, 3];
        expect(() => cosineSimilarity(u, v)).toThrow("Vectors must be of the same length");
    });

    // Test: Cosine similarity of a vector with itself (should be 1)
    test('should return 1 when both vectors are the same', () => {
        const u = [3, 4, 5];
        const result = cosineSimilarity(u, u);
        expect(result).toBeCloseTo(1, 5);
    });

    // Test: Cosine similarity of large numbers
    test('should handle large numbers correctly', () => {
        const u = [1e6, 2e6, 3e6];
        const v = [3e6, 2e6, 1e6];
        const result = cosineSimilarity(u, v);
        expect(result).toBeCloseTo(5 / 7, 5); // Pre-computed result
    });

});

describe('klDivergence', () => {
    test('calculates KL divergence between two simple distributions', () => {
        const P = [0.4, 0.6];
        const Q = [0.5, 0.5];
        const result = klDivergence(P, Q);
        expect(result).toBeCloseTo(0.020136, 4); // Expected result with tolerance of 4 decimal places
    });

    test('returns zero divergence for identical distributions', () => {
        const P = [0.2, 0.5, 0.3];
        const Q = [0.2, 0.5, 0.3];
        const result = klDivergence(P, Q);
        expect(result).toBeCloseTo(0, 4);
    });

    test('handles distributions with zero probability in P without contributing to divergence', () => {
        const P = [0.0, 1.0];
        const Q = [0.5, 0.5];
        const result = klDivergence(P, Q);
        expect(result).toBeCloseTo(0.6931, 4); // -log(0.5) for the non-zero term
    });

    test('throws error if Q has zero probability where P is non-zero', () => {
        const P = [0.5, 0.5];
        const Q = [0.5, 0.0];
        expect(() => klDivergence(P, Q)).toThrow("Q cannot contain zero values if corresponding P[i] is non-zero.");
    });

    test('throws error if P and Q have different lengths', () => {
        const P = [0.3, 0.7];
        const Q = [0.3, 0.3, 0.4];
        expect(() => klDivergence(P, Q)).toThrow("P and Q must have the same length.");
    });

    test('throws error if P contains negative values', () => {
        const P = [-0.1, 0.6, 0.5];
        const Q = [0.2, 0.5, 0.3];
        expect(() => klDivergence(P, Q)).toThrow("P and Q must only contain non-negative values.");
    });

    test('throws error if Q contains negative values', () => {
        const P = [0.2, 0.5, 0.3];
        const Q = [0.2, -0.5, 0.3];
        expect(() => klDivergence(P, Q)).toThrow("P and Q must only contain non-negative values.");
    });
});

describe('softMax', () => {
    it('calculates softmax correctly for a simple distribution', () => {
        const distribution = [1, 2, 3];
        const result = softMax(distribution);

        // Expected values calculated manually or with a reliable source
        const expected = [
            Math.exp(1 - 3) / (Math.exp(1 - 3) + Math.exp(2 - 3) + Math.exp(3 - 3)),
            Math.exp(2 - 3) / (Math.exp(1 - 3) + Math.exp(2 - 3) + Math.exp(3 - 3)),
            Math.exp(3 - 3) / (Math.exp(1 - 3) + Math.exp(2 - 3) + Math.exp(3 - 3)),
        ];

        expected.forEach((value, index) => {
            expect(result[index]).toBeCloseTo(value, 5); // Tolerance of 5 decimal places
        });
    });

    it('normalizes the output to sum to 1', () => {
        const distribution = [1, 2, 3];
        const result = softMax(distribution);
        
        const sum = result.reduce((acc, val) => acc + val, 0);
        expect(sum).toBeCloseTo(1, 5); // Check sum close to 1
    });

    it('returns equal values for an identical distribution', () => {
        const distribution = [5, 5, 5];
        const result = softMax(distribution);
        
        expect(result[0]).toBeCloseTo(1 / 3, 5);
        expect(result[1]).toBeCloseTo(1 / 3, 5);
        expect(result[2]).toBeCloseTo(1 / 3, 5);
    });

    it('handles negative values correctly', () => {
        const distribution = [-1, -2, -3];
        const result = softMax(distribution);

        // Expected values calculated manually
        const expected = [
            Math.exp(-1 + 3) / (Math.exp(-1 + 3) + Math.exp(-2 + 3) + Math.exp(-3 + 3)),
            Math.exp(-2 + 3) / (Math.exp(-1 + 3) + Math.exp(-2 + 3) + Math.exp(-3 + 3)),
            Math.exp(-3 + 3) / (Math.exp(-1 + 3) + Math.exp(-2 + 3) + Math.exp(-3 + 3)),
        ];

        expected.forEach((value, index) => {
            expect(result[index]).toBeCloseTo(value, 5);
        });
    });

    it('handles an empty distribution by returning an empty array', () => {
        const distribution: number[] = [];
        const result = softMax(distribution);
        expect(result).toEqual([]);
    });
});

