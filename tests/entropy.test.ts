import { calculateEntropy, softMax } from "../lib/entropy";

describe('uniform entropy', () => {
    it('should calculate the shannon entropy of a uniform array', () => {
        const distribution = [ 2.0, 2.0, 2.0, 2.0, 2.0 ];
        const expected = Math.log2(distribution.length);
        const result = calculateEntropy(distribution);

        expect(result).toBeCloseTo(expected);
    });
});

describe('kronecker-delta entropy', () => {
    it('should calculate the shannon entropy of an array with a single nonzero value', () => {
        const distribution = [ 5.0, 0.0, 0.0, 0.0, 0.0 ];
        const expected = 0;
        const result = calculateEntropy(distribution);

        expect(result).toBeCloseTo(expected);
    });
});

// Import the softMax function
// import { softMax } from './path-to-your-function-file';

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

