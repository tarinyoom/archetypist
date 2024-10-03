import { Compendium, Known, Element } from "./types";

function research_element(element: Element): number[] {
    return [1, 1, 1];
}

function research_elements(elements: Element[]): Known<Element>[] {
    return elements.map(element => ({
        thing: element,
        evaluation: research_element(element)
    }));
}

export function research_compendium(compendium: Compendium<Element>): Compendium<Known<Element>> {
    return {
        people: research_elements(compendium.people),
        places: research_elements(compendium.places),
        energies: research_elements(compendium.energies)
    };
}