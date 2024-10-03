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
              people: [ 0.3421156141056243, 0.5600986709170759 ],
              places: [ 0.23284184274063052 ],
              energies: [ 0.27604478784887665 ]
            },
            {
              people: [ 0.4691948120370026, 0.2808420429475319 ],
              places: [ 0.69290434627908 ],
              energies: [ 0.2748547093762384 ]
            }
        ];
        const results = await assessFragments(fragments, compendium);
        expect(results).toEqual(expected);
    });
});
