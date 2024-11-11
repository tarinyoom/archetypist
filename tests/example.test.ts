import { compare, reduce } from "../lib/index"

import _simpleInput from "../example/simpleInput.json"
import _complexInput from "../example/complexInput.json"
import _reference from "../example/reference.json"

interface Input {
    fragments: string[];
    expectedComplexity: number;
}

interface Reference {
    archetypes: string[];
}

// Cast example jsons as their appropriate types
const simpleInput: Input = _simpleInput as Input;
const complexInput: Input = _complexInput as Input;
const reference: Reference = _reference as Reference;

describe('Test example cases', () => {
    test('Validate narratively simple input', async () => {
        const similarities = await compare(simpleInput.fragments, reference.archetypes);
        const complexity = reduce(similarities);

        expect(complexity).toBeCloseTo(simpleInput.expectedComplexity, 5);
    });
  
    test('Validate narratively complex input', async () => {
        const similarities = await compare(complexInput.fragments, reference.archetypes);
        const complexity = reduce(similarities);

        expect(complexity).toBeCloseTo(complexInput.expectedComplexity, 5);
    });
});
