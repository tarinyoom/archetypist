import { getDivergenceSignal, getTotalDivergence } from "../lib/index";

const cityReferenceFragments =
[
    "Nestled among rolling hills, the quaint medieval village is a charming tableau of thatched-roof cottages, winding cobblestone paths, and colorful flower gardens, with villagers bustling about in traditional attire as the sun sets behind the ancient stone church.",
    "Towering over a sprawling urban landscape, the bustling metropolis is a vibrant mix of glass skyscrapers, crowded streets filled with taxis and pedestrians, and a cacophony of sounds from street vendors and the distant hum of subway trains, all illuminated by the glow of neon lights.",
    "Perched on a scenic cliff overlooking the azure sea, the coastal town is a picturesque haven of pastel-colored homes, quaint fishing boats bobbing in the harbor, and sandy beaches, where the salty breeze carries the laughter of children and the scent of fresh seafood from nearby restaurants.",
    "Tucked away from the hustle and bustle, the quiet suburban neighborhood is a peaceful retreat of tree-lined streets, manicured lawns, and cozy single-family homes, where children ride bicycles and neighbors chat over white picket fences, creating a sense of community and belonging.",
    "Rich in heritage, the historical city is a tapestry of cobblestone streets, grandiose cathedrals, and centuries-old buildings, with every corner revealing stories of the past, as tourists wander through bustling squares filled with street performers and local artisans showcasing their crafts."
]

describe('divergence signals', () => {
    test('archetypical city description', async () => {
        const inputFragments = [
            "towering over crowded avenues",
            "bustling metropolis",
            "a maze of glistening skyscrapers",
            "neon-lit storefronts", 
            "sleek steel bridges."
        ];
        const result = await getDivergenceSignal(inputFragments, cityReferenceFragments);
        const expected = [0.00006709122213582582, 0.00010558620562956715, 0.0018691967931962917, 0.0020684331812059675];

        for (let i = 0; i < result.length; i++) {
            expect(result[i]).toBeCloseTo(expected[i], 8);
        }
    });

    test('archetypical village description', async () => {
        const inputFragments = [
            "nestled in a lush valley", 
            "quaint village",
            "cobblestone streets",
            "timber-framed cottages",
            "ivy-covered stone walls"
        ];
        const result = await getDivergenceSignal(inputFragments, cityReferenceFragments);
        const expected = [0.002100120408560677, 0.005686793380091173, 0.0033198422877170133, 0.0003113205058277845];

        for (let i = 0; i < result.length; i++) {
            expect(result[i]).toBeCloseTo(expected[i], 8);
        }
    });

    test('mixed city description', async () => {
        const inputFragments = [
            "nestled in a lush valley",
            "the bustling metropolis",
            "glistening skyscrapers",
            "cobblestone streets",
            "neon-lit storefronts"
        ];

        const result = await getDivergenceSignal(inputFragments, cityReferenceFragments);
        const expected = [0.018808555567372126, 0.00046212038390891844, 0.011136567510800699, 0.007721062653233267];

        for (let i = 0; i < result.length; i++) {
            expect(result[i]).toBeCloseTo(expected[i], 8);
        }
    });
});

describe('mean divergence', () => {
    test('archetypical city description', async () => {
        const inputFragments = [
            "towering over crowded avenues",
            "bustling metropolis",
            "a maze of glistening skyscrapers",
            "neon-lit storefronts", 
            "sleek steel bridges."
        ];
        const result = await getTotalDivergence(inputFragments, cityReferenceFragments);
        const expected = 0.001027576850541913;

        expect(result).toBeCloseTo(expected, 5);
    });

    test('archetypical village description', async () => {
        const inputFragments = [
            "nestled in a lush valley", 
            "quaint village",
            "cobblestone streets",
            "timber-framed cottages",
            "ivy-covered stone walls"
        ];
        const result = await getTotalDivergence(inputFragments, cityReferenceFragments);
        const expected = 0.002854519145549162;

        expect(result).toBeCloseTo(expected, 5);
    });

    test('mixed city description', async () => {
        const inputFragments = [
            "nestled in a lush valley",
            "the bustling metropolis",
            "glistening skyscrapers",
            "cobblestone streets",
            "neon-lit storefronts"
        ];

        const result = await getTotalDivergence(inputFragments, cityReferenceFragments);
        const expected = 0.009532076528828752;

        expect(result).toBeCloseTo(expected, 5);
    });
});
