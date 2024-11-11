import { reduce } from "../lib/index";

describe('reduce function', () => {
    it('should return the mean KL divergence of a simple input array', () => {
        const probabilities = [
            [0.2, 0.8],
            [0.3, 0.7],
            [0.25, 0.75]
        ];
        const result = reduce(probabilities);
        expect(result).toBeCloseTo(0.0160668, 5); // Adjust based on expected result
    });

    it('should handle uniform distributions', () => {
        const probabilities = [
            [0.5, 0.5],
            [0.5, 0.5],
            [0.5, 0.5]
        ];
        const result = reduce(probabilities);
        expect(result).toBeCloseTo(0, 5);
    });

    it('should handle varying probabilities', () => {
        const probabilities = [
            [0.1, 0.9],
            [0.4, 0.6],
            [0.3, 0.7],
            [0.5, 0.5]
        ];
        const result = reduce(probabilities);
        expect(result).toBeCloseTo(0.110385, 5); // Replace with expected value if known
    });

    it('should throw an error if probabilities array has fewer than two distributions', () => {
        const probabilities = [[0.5, 0.5]];
        expect(() => reduce(probabilities)).toThrow('Array must have at least two elements.');
    });
    
    it('should handle larger probability distributions', () => {
        const probabilities = [
            [0.2, 0.3, 0.5],
            [0.1, 0.4, 0.5],
            [0.3, 0.2, 0.5],
            [0.25, 0.25, 0.5]
        ];
        const result = reduce(probabilities);
        expect(result).toBeCloseTo(0.0765967, 5); // Adjust based on expected result
    });
});
