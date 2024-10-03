import { research_compendium } from '../lib/research';
import { Compendium } from "../lib/types/compendium";
import { Element } from "../lib/types/element";
import { Known } from "../lib/types/known";

describe('research_compendium', () => {
    it('should map a Compendium<Element> to a Compendium<Known<Element>>', () => {
        const input: Compendium<Element> = {
            people: [
                { name: 'Alice', description: 'A curious explorer' },
                { name: 'Bob', description: 'A brave knight' }
            ],
            places: [
                { name: 'Wonderland', description: 'A mysterious place' }
            ],
            energies: [
                { name: 'Curiosity', description: 'A driving force of discovery' }
            ]
        };

        const result = research_compendium(input);
        const expected: Compendium<Known<Element>> = {
            people: [
                { thing: { name: 'Alice', description: 'A curious explorer' }, evaluation: [1, 1, 1] },
                { thing: { name: 'Bob', description: 'A brave knight' }, evaluation: [1, 1, 1] }
            ],
            places: [
                { thing: { name: 'Wonderland', description: 'A mysterious place' }, evaluation: [1, 1, 1] }
            ],
            energies: [
                { thing: { name: 'Curiosity', description: 'A driving force of discovery' }, evaluation: [1, 1, 1] }
            ]
        };
        expect(result).toEqual(expected);
    });
});
