const mockModelPredict = async (filepath) => {
    const isCancer = Math.random() > 0.5;
    return isCancer ? 'Cancer' : 'Non Cancer';
}

module.exports = mockModelPredict;