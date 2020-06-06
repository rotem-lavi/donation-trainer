const convertModelToPy = (modelCode) => {
    return modelCode
        .replace("function anonymous(input", "")
        .replace(") {", "")
        .replace("return", "")
        .replace(";", "")
        .replace(/Math\./g, "math.")
        .replace(/\|\|/g, " or ")
        .trim()
        .slice(0, -1)
        .trim();
}

module.exports = convertModelToPy