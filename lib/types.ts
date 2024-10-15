export type Vector<T> = {
    people: T;
    places: T;
    energies: T;
}

export type Compendium<T> = Vector<T[]>;

export type Element = {
    name: string;
    description: string;
};

export type Known<T> = {
    thing: T;
    evaluation: number[];
};
