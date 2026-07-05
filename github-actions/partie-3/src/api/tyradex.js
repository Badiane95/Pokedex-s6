import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

export const fetchPokemonForGeneration = async (generation = 1) => {
    try {
        const req = await api.get(`/v1/gen/${generation}`);
        const serverErrorStartNumber = 400;
        if (req.data?.status >= serverErrorStartNumber) {
            return [];
        }
        return req.data;
    } catch (error) {
        // 402 Payment Required : API Tyradex indisponible (payante)
        const httpStatus = error?.response?.status ?? error?.cause?.status;
        if (httpStatus === 402) {
            throw new Error("API unavailable", { cause: { status: 402, apiUnavailable: true } });
        }
        console.error('Erreur fetchPokemonForGeneration:', error);
        return [];
    }
};

export const fetchPokemon = async (pkmnId, region = null) => {
    try {
        const regionName = region ? `/${region}` : "";
        const req = await api.get(`/v1/pokemon/${pkmnId}${regionName}`);

        return req.data;
    } catch (error) {
        console.error('Erreur fetchPokemon:', error);
        return null;
    }
};

export const fetchAllTypes = async () => {
    try {
        const req = await api.get("/v1/types");

        return req.data;
    } catch (error) {
        console.error('Erreur fetchAllTypes:', error);
        return [];
    }
};