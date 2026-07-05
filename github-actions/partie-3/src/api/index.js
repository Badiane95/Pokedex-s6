import "./utils";

export * from "./pokeapi";
export * from "./tyradex";

import { fetchTCGCards as fetchTCGCardsByName } from "./tcgdex.js";

const tcgCache = {};

export const fetchTCGCards = async (pokemonNameOrId) => {
    const cacheKey = String(pokemonNameOrId);
    if (tcgCache[cacheKey] !== undefined) return tcgCache[cacheKey];

    const cards = await fetchTCGCardsByName(pokemonNameOrId);
    tcgCache[cacheKey] = cards;
    return cards;
};
