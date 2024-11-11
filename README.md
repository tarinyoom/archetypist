# Archetypist
Archetypist is a tool for assessing the narrative complexity of a description.
The narrative complexity represents how cohesive the ideas within a description are, based on their consistency in following the themes in a set of reference archetypes.
Descriptions with ideas belonging to many different archetypes are considered to have high narrative complexity, whereas descriptions that focus on an archetype are considered to have low narrative complexity.

## An Example
As a motivating example, consider the following two location descriptions of a bustling metropolis and a quaint village:

> Towering over crowded avenues, the bustling metropolis is a maze of glistening skyscrapers, neon-lit storefronts, and sleek steel bridges.

> Nestled in a lush valley, the quaint village is a tapestry of cobblestone streets, timber-framed cottages, and ivy-covered stone walls.

These are archetypal descriptions of a "bustling metropolis" and a "quaint village", each with details aligned with their respective archetypes.
Each of these descriptions has low narrative complexity, since each stays within a well-established archetype.
We could also create a less archetypal description by combining fragments these two archetypal descriptions:

> Nestled in a lush valley, the bustling metropolis is a tapestry of glistening skyscrapers, cobblestone streets, and neon-lit storefronts.

While this is still a logically consistent description, it mixes ideas from multiple archetypes, adding narrative complexity
So Archetypist should identify the first two sentences as having lower narrative complexity than the third.

## Methodology
The approach consists a _compare_ step, and a _reduce_ step, as shown below.
The composition of these steps takes in a set of input fragments, representing the description to be evaluated, and a set of reference fragments, representing archetypes.
It returns a real value representing the narrative complexity of the description.

```mermaid
---
title: Archetypist Pipeline
---
flowchart LR
    InputFrags@{ shape: in-out, label: "Input fragments" }
    RefFrags@{ shape: in-out, label: "Reference fragments" }
    Similarities@{ shape: process, label: "Compare" }
    Entropy@{ shape: process, label: "Reduce" }
    Out@{ shape: stadium, label: "Result"}

    InputFrags --> Similarities
    RefFrags --> Similarities
    Similarities --> Entropy
    Entropy --> Out
```

In the _compare_ step, Archetypist takes in input fragments and reference fragments, representing the input description and reference archetype descriptions, respectively.
It then uses the [Cohere embed](https://cohere.com/embed) endpoint to 

### Compare
The _compare_ step takes in input fragments and reference fragments, and evaluates their pairwise similarities using the [Cohere embed endpoint](https://cohere.com/embed).
This endpoint returns the vector embedding of a fragment, so that the similarity of two fragments can be found by taking the cosine similarity of their respective vector embeddings.
_Compare_ takes the [softmax](https://en.wikipedia.org/wiki/Softmax_function) of the similarities for each input fragment, to create a probability distribution for that fragment.
This probability distribution can be interpreted as, "the probability that this input fragment belongs to X reference archetype".
These probabilities are returned as a matrix, whose rows are probability distributions attributed to each input fragment.

### Reduce
The _reduce_ step takes in a probability matrix and reduces it to a single value, by tracking the behavior of the probability distribution from fragment to fragment.
It uses [Kullback-Leibler (KL) divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) as a measure of disagreement between probability distributions of two consecutive fragments.
The resulting sequence represents the amount of local narrative complexity over the course of the sentence.
_Reduce_ returns the mean divergence to represent the mean narrative complexity of the sentence.
