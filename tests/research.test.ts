import { researchCompendium } from "../lib/research";
import { Compendium, Known, Element } from "../lib/types";

describe('research_compendium', () => {
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
