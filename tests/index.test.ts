import { compare, reduce } from "../lib/index";

describe('compare function', () => {
    it('should return a similarity matrix for two simple sets of fragments', async () => {
        const inputFragments = ["a seafarer", "a banker"];
        const referenceFragments = ["a fishing town", "a desert metropolis"];
        
        const expected = [
            [0.5423115468881636, 0.45768845311183637],
            [0.4997163964310868, 0.5002836035689132]
        ];

        const result = await compare(inputFragments, referenceFragments);

        result.forEach(
            (row, i) => row.forEach(
                (elem, j) => expect(elem).toBeCloseTo(expected[i][j], 5)));
    });

    it('should handle empty input fragments', async () => {
        const inputFragments: string[] = [];
        const referenceFragments = ["bird", "fish"];

        const result = await compare(inputFragments, referenceFragments);

        expect(result).toEqual([]); // Expect an empty array if no input fragments
    });

    it('should handle empty reference fragments', async () => {
        const inputFragments = ["tree", "flower"];
        const referenceFragments: string[] = [];

        const result = await compare(inputFragments, referenceFragments);

        expect(result).toEqual([[], []]); // Expect empty inner arrays for each input fragment
    });

    it('should handle cases where both input and reference fragments are empty', async () => {
        const inputFragments: string[] = [];
        const referenceFragments: string[] = [];

        const result = await compare(inputFragments, referenceFragments);

        expect(result).toEqual([]); // Both input and reference fragments are empty
    });
});

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
