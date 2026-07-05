import axios from "axios";

const API_BASE = "https://tyradex.vercel.app";

export const fetchPokemonForGeneration = async (generation = 1) => {
    let listPokemon = [];
    try {
        const req = await axios.get(`${API_BASE}/api/v1/gen/${generation}`);
        listPokemon = req.data;

        const serverErrorStartNumber = 400;
        if (req.data?.status >= serverErrorStartNumber) {
            throw new Error("", { cause: req.data });
        }

        return listPokemon;
    } catch (error) {
        // 402 Payment Required : API Tyradex indisponible (payante)
        const httpStatus = error?.response?.status ?? error?.cause?.status;
        if (httpStatus === 402) {
            throw new Error("API unavailable", { cause: { status: 402, apiUnavailable: true } });
        }
        throw new Error("", { cause: error?.cause });
    }
};

export const fetchPokemon = async (pkmnId, region = null) => {
    try {
        const regionName = region ? `/${region}` : "";
        const req = await axios.get(`${API_BASE}/api/v1/pokemon/${pkmnId}${regionName}`);

        return req.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchAllTypes = async () => {
    try {
        const req = await axios.get(`${API_BASE}/api/v1/types`);

        return req.data;
    } catch (error) {
        throw new Error(error);
    }
};