import { getEmbeddings } from "./embed";
import { Compendium, Known, Element } from "./types";

async function researchElements(elements: Element[]): Promise<Known<Element>[]> {
    const evaluations = await getEmbeddings(elements.map(element => element.description));
    return elements.map((element, i) => ({
        thing: element,
        evaluation: evaluations[i]
    }));
}

export async function researchCompendium(compendium: Compendium<Element>): Promise<Compendium<Known<Element>>> {
    return {
        people: await researchElements(compendium.people),
        places: await researchElements(compendium.places),
        energies: await researchElements(compendium.energies)
    };
}

function cosineSimilarity(u: number[], v: number[]): number {
    const dotProduct = u.reduce((sum, value, index) => sum + value * v[index], 0);
    const magnitudeU = Math.sqrt(u.reduce((sum, value) => sum + value * value, 0));
    const magnitudeV = Math.sqrt(v.reduce((sum, value) => sum + value * value, 0));
    return dotProduct / (magnitudeU * magnitudeV);
}

function findSimilarities(evaluation: number[], known_elements: Known<Element>[]): number[] {
    return known_elements.map((known) => cosineSimilarity(evaluation, known.evaluation));
}

function assessFragment(fragment_evaluation: number[], compendium: Compendium<Known<Element>>): Compendium<number> {
    return {
        people: findSimilarities(fragment_evaluation, compendium.people),
        places: findSimilarities(fragment_evaluation, compendium.places),
        energies: findSimilarities(fragment_evaluation, compendium.energies)
    };
}

export async function assessFragments(fragments: string[], compendium: Compendium<Known<Element>>): Promise<Compendium<number>[]> {
    const fragment_evaluations = await getEmbeddings(fragments);
    return fragment_evaluations.map((evaluation) => assessFragment(evaluation, compendium));
}
