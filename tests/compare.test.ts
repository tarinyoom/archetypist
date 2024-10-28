import { compare } from "../lib/compare";

describe('compare', () => {
    it('should return the correct cosine similarities for each embedding pair', () => {
        const inputEmbeddings = [
            [1, 2, 3],
            [4, 5, 6],
        ];
        const referenceEmbeddings = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ];

        const result = compare(inputEmbeddings, referenceEmbeddings);

        // Calculate expected results manually
        const expected = [
            [
                0.2672612419124244,
                0.4558423058385518
            ],
            [
                0.5345224838248488,
                0.5698028822981898
            ],
            [
                0.8017837257372732,
                0.6837634587578276
            ]
        ];

        expect(result).toEqual(expected);
    });
});
