module.exports = (rawData) => {
    const parsedData = rawData.reduce((accumulator, currentValue) => {
        // Extract
        const safeFloors = safeParseFloat(currentValue.ms_komot);
        const safeEarnings = safeParseFloat(currentValue.currentYearEarnings) / 10000;
        const safeNeighborhoodName = safeParseFloat(currentValue.neighborhoodName);

        // Init
        accumulator[safeNeighborhoodName] = accumulator[safeNeighborhoodName] || {
            totalFloors: 0,
            totalEarnings: 0
        };

        // Sum
        accumulator[safeNeighborhoodName].totalFloors += safeFloors;
        accumulator[safeNeighborhoodName].totalEarnings += safeEarnings;

        return accumulator
    }, {});

    // Calculate
    const finalData = {};
    for (const [neighborhoodName, neighborhoodData] of Object.entries(parsedData)) {
        finalData[neighborhoodName] = (neighborhoodData.totalEarnings / neighborhoodData.totalFloors) + (Math.random() / 10);
    }
    finalData.unknown = (Object.values(finalData).reduce((a, c) => a + c, 0) / Object.keys(finalData).length) + (Math.random() / 10);

    // Construct
    return `{'currentYearEarnings': ${JSON.stringify(finalData)}.get(str(input['neighborhoodName']), ${JSON.stringify(finalData)}['unknown']) * input['ms_komot']}`;
}

const safeParseFloat = (val) => {
    const parsedFloat = parseFloat(val);
    if (isNaN(parsedFloat)) {
        return 0;
    }
    return parsedFloat;
}