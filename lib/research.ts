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
