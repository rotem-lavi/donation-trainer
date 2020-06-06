const brain = require("brain.js");
const {FILED_TO_STANDERIZER, STANDARDIZE_INPUTS, STANDARDIZE_NEIGHBORHOOD, OUTPUT, networkConfig} = require('./consts')


/*
1 record in raw data:
{"gova_simplex_2019": "", ms_komot: "", max_height: "", min_height: "", lastYearEarnings: "", currentYearEarnings: "", neighborhoodName: ""}
 currentYearEarnings = last donation
 lastYearEarnings = what we expected in the modal
 */

const train = (rawData) => {
    const net = new brain.NeuralNetwork(networkConfig);

    const networkRecords = rawData
        .map(cleanRecord)
        .map(encodeRecord)
        .map(buildNetworkRecord);

    net.train(networkRecords);

    return net.toFunction().toString();
}


const encode = (attributeName, value) => {
    if (FILED_TO_STANDERIZER[attributeName]) {
        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) {
            return STANDARDIZE_INPUTS[FILED_TO_STANDERIZER[attributeName]][value];
        }

        return value / STANDARDIZE_INPUTS[FILED_TO_STANDERIZER[attributeName]];
    }

    return 0;
};

const cleanRecord = record => {
    const cleanRecord = {...record};

    for (const key of Object.keys(cleanRecord)) {
        if (!FILED_TO_STANDERIZER[key]) {
            delete cleanRecord[key];
        }
    }

    return cleanRecord;
};

const encodeRecord = record => {
    const cleanRecord = {...record};

    for (const key of Object.keys(cleanRecord)) {
        cleanRecord[key] = encode(key, cleanRecord[key]);
    }

    return cleanRecord;
};

const buildNetworkRecord = record => {
    const input = {};
    const output = {};

    for (const key of Object.keys(record)) {
        if (OUTPUT.attributeName === key) {
            output[OUTPUT.outputName] = record[key];
        } else {
            input[key] = record[key];
        }
    }

    return {
        input,
        output
    };
};

module.exports = train;