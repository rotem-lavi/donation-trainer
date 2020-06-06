const neighborhoodsData = require("../seed_data/neighborhoods.json");

const networkConfig = {
    activation: 'tanh',
}

const OUTPUT = {
    attributeName: "currentYearEarnings",
    outputName: "currentYearEarnings"
};

const STANDARDIZE_NEIGHBORHOOD = Object.fromEntries(
    neighborhoodsData.features.map(n => [
        n.attributes.shem_shchuna,
        n.attributes.ms_shchuna / 100
    ])
);

const STANDARDIZE_INPUTS = {
    FLOORS: 100,
    EARNINGS: 1000,
    MIN_HEIGHT: 1000,
    MAX_HEIGHT: 1000,
    GOVA_SIMPLEX: 1000,
    STANDARDIZE_NEIGHBORHOOD: STANDARDIZE_NEIGHBORHOOD
};

const FILED_TO_STANDERIZER = {
    gova_simplex_2019: "GOVA_SIMPLEX",
    ms_komot: "FLOORS",
    max_height: "MAX_HEIGHT",
    min_height: "MIN_HEIGHT",
    lastYearEarnings: "EARNINGS",
    currentYearEarnings: "EARNINGS",
    neighborhoodName: "STANDARDIZE_NEIGHBORHOOD"
};


module.exports = {FILED_TO_STANDERIZER, STANDARDIZE_INPUTS, STANDARDIZE_NEIGHBORHOOD, OUTPUT, networkConfig}