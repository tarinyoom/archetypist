import { calculateEntropy } from "../lib/entropy";

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
