const THRESHOLD = 0.01;

const BUILDINGS = [
    {
        'data': {
            'ms_komot': 0.14,
            'gova_simplex_2019': 0.05658,
            'max_height': 0.061520000000000005,
            'min_height': 0.004940000000000001,
            'neighborhoodName': 0.32,
            'lastYearEarnings': 0.02
        },
        'acceptanceOutput': 0.02
    },
    {
        data: {
            'ms_komot': 0.01,
            'gova_simplex_2019': 0.05124,
            'max_height': 0.05832,
            'min_height': 0.00708,
            'neighborhoodName': 0.32,
            'lastYearEarnings': 0.002
        },
        'acceptanceOutput': 0.002
    },
    {
        data: {
            'ms_komot': 0.01,
            'gova_simplex_2019': 0.00884,
            'max_height': 0.01357,
            'min_height': 0.004730000000000001,
            'neighborhoodName': 0.32,
            'lastYearEarnings': 0.002
        },
        'acceptanceOutput': 0

    }
]

const checker = (network) => {
    for (const building of BUILDINGS) {
        const {currentYearEarnings} = network.run(building.data);

        if (currentYearEarnings < 0 || currentYearEarnings > building.acceptanceOutput + THRESHOLD || currentYearEarnings < building.acceptanceOutput + THRESHOLD) {
            return false;
        }
    }

    return true

}

module.exports = checker;