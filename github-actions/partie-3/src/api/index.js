import "./utils";

export * from "./pokeapi";
export * from "./tyradex";

const tcgCache = {};

export const fetchTCGCards = async (pkmnId) => {
    if (tcgCache[pkmnId] !== undefined) return tcgCache[pkmnId];
    try {
        const res = await fetch(`https://api.tcgdex.net/v2/fr/cards?pokedexNumber=${pkmnId}`);
        if (!res.ok) { tcgCache[pkmnId] = []; return []; }
        tcgCache[pkmnId] = await res.json();
        return tcgCache[pkmnId];
    } catch (_e) {
        tcgCache[pkmnId] = [];
        return [];
    }
};
