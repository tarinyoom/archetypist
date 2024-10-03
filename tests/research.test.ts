import { researchCompendium, assessFragments } from "../lib/research";
import { Compendium, Known, Element } from "../lib/types";

describe('researchCompendium', () => {
    it('should map a Compendium<Element> to a Compendium<Known<Element>>', async () => {
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

        const result = await researchCompendium(input);

        const isValidEvaluation = (evaluation: number[]): boolean => {
            return evaluation.length > 0 && Math.max(...evaluation) > Math.min(...evaluation);
        };

        const categories: Array<keyof Compendium<Known<Element>>> = ['people', 'places', 'energies'];
        categories.forEach(category => {
            result[category].forEach(item => {
                expect(isValidEvaluation(item.evaluation)).toBe(true);
            });
        });
    });
});

describe('researchFragments', () => {
    it('should map a Compendium<Element> to a Compendium<Known<Element>>', async () => {
        const initial: Compendium<Element> = {
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

        const compendium = await researchCompendium(initial);
        const fragments = ["A castle defender", "An unusual location"];
        const expected = [
            {
              people: [ 0.3791955190523463, 0.6208044809476537 ],
              places: [ 1 ],
              energies: [ 1 ]
            },
            {
              people: [ 0.6255623425953879, 0.3744376574046122 ],
              places: [ 1 ],
              energies: [ 1 ]
            }
        ];
        const results = await assessFragments(fragments, compendium);
        expect(results).toEqual(expected);
    });
});
