const convertModelToPy = (modelCode) => {
    return modelCode
        .replace("function anonymous(input", "")
        .replace(") {", "")
        .replace("return", "")
        .replace(";", "")
        .replace(/Math\.tanh/g, "math.tanh")
        .replace(/\|\|/g, " or ")
        .trim()
        .slice(0, -1)
        .trim();
}

module.exports = convertModelToPy