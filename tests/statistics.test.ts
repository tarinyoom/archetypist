import { softMax } from "../lib/statistics";
import { klDivergence } from "../lib/statistics";

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

