import { getEmbeddings } from "./embed";
import { Compendium, Known, Element } from "./types";

async function research_elements(elements: Element[]): Promise<Known<Element>[]> {
    const evaluations = await getEmbeddings(elements.map(element => element.description));
    return elements.map((element, i) => ({
        thing: element,
        evaluation: evaluations[i]
    }));
}

export async function research_compendium(compendium: Compendium<Element>): Promise<Compendium<Known<Element>>> {
    return {
        people: await research_elements(compendium.people),
        places: await research_elements(compendium.places),
        energies: await research_elements(compendium.energies)
    };
}
