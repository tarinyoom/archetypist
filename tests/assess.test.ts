import { assess } from "../lib/assess";

const cityReferenceFragments =
[
    "Nestled among rolling hills, the quaint medieval village is a charming tableau of thatched-roof cottages, winding cobblestone paths, and colorful flower gardens, with villagers bustling about in traditional attire as the sun sets behind the ancient stone church.",
    "Towering over a sprawling urban landscape, the bustling metropolis is a vibrant mix of glass skyscrapers, crowded streets filled with taxis and pedestrians, and a cacophony of sounds from street vendors and the distant hum of subway trains, all illuminated by the glow of neon lights.",
    "Perched on a scenic cliff overlooking the azure sea, the coastal town is a picturesque haven of pastel-colored homes, quaint fishing boats bobbing in the harbor, and sandy beaches, where the salty breeze carries the laughter of children and the scent of fresh seafood from nearby restaurants.",
    "Tucked away from the hustle and bustle, the quiet suburban neighborhood is a peaceful retreat of tree-lined streets, manicured lawns, and cozy single-family homes, where children ride bicycles and neighbors chat over white picket fences, creating a sense of community and belonging.",
    "Rich in heritage, the historical city is a tapestry of cobblestone streets, grandiose cathedrals, and centuries-old buildings, with every corner revealing stories of the past, as tourists wander through bustling squares filled with street performers and local artisans showcasing their crafts."
]

describe('assess city', () => {
    it('should assess the entropy of a archetypical city description', async () => {
        const inputFragments = [
            "towering over crowded avenues",
            "bustling metropolis",
            "a maze of glistening skyscrapers",
            "neon-lit storefronts", 
            "sleek steel bridges."
        ];
        const result = await assess(inputFragments, cityReferenceFragments);

        expect(result).toBeCloseTo(2.2751880989733437);
    });
});

describe('assess village', () => {
    it('should assess the entropy of a archetypical village description', async () => {
        const inputFragments = [
            "nestled in a lush valley", 
            "quaint village",
            "cobblestone streets",
            "timber-framed cottages",
            "ivy-covered stone walls"
        ];
        const result = await assess(inputFragments, cityReferenceFragments);

        expect(result).toBeCloseTo(2.2903850031318114);
    });
});

describe('assess mixed description', () => {
    it('should assess the entropy of a mixed city description', async () => {
        const inputFragments = [
            "nestled in a lush valley",
            "the bustling metropolis",
            "a tapestry",
            "glistening skyscrapers",
            "cobblestone streets",
            "neon-lit storefronts"
        ];

        const result = await assess(inputFragments, cityReferenceFragments);

        expect(result).toBeCloseTo(2.3090437687148904);
    });
});
