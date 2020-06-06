const brain = require("brain.js");
const {FILED_TO_STANDERIZER, STANDARDIZE_INPUTS, OUTPUT, networkConfig} = require('./consts')
const checker = require('./checker')

const MAX_ITERATIONS = 100000;

/*
1 record in raw data:
{"gova_simplex_2019": "", ms_komot: "", max_height: "", min_height: "", lastYearEarnings: "", currentYearEarnings: "", neighborhoodName: ""}
 currentYearEarnings = last donation
 lastYearEarnings = what we expected in the modal
 */


const shuffleModalRecords = (records) => {
    return records.map(r => ({
        ...r,
        output: {...r.output, currentYearEarnings: r.currentYearEarnings + Math.abs(Math.random())}
    }))
}

const train = (rawData) => {
    const net = new brain.NeuralNetwork(networkConfig);

    const networkRecords = rawData
        .map(cleanRecord)
        .map(encodeRecord)
        .map(buildNetworkRecord);

    let isOk = false;
    let iterations = 0;

    do {
        let networkRecordsToTrain = [...networkRecords];
        if (iterations >= 3) {
            // Helping the modal a bit
            console.log("Shuffling records")
            networkRecordsToTrain = shuffleModalRecords(networkRecordsToTrain)
        }

        iterations++;

        net.train(networkRecordsToTrain, {
            errorThresh: 0.001, // the acceptable error percentage from training data
        });

        isOk = checker(net) || iterations >= MAX_ITERATIONS
    } while (!isOk);

    if (iterations >= MAX_ITERATIONS)
        console.log("Max iterations was hit")

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