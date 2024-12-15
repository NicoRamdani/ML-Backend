const { getPreditictionFromFirestore } = require('../services/firestoreService');

const historyHandler = async (request, h) => {
    try {
        const histories = await getPreditictionFromFirestore();

        return h.response({
            status: 'success',
            data: histories.map(history => ({
                id: history.id,
                history: {
                    result: history.result,
                    createdAt: history.createdAt,
                    suggestion: history.suggestion,
                    id: history.id,
                }
            }))
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'fail',
            message: 'Gagal mengambil riwayat prediksi'
        }).code(500);
        
    }
};

module.exports = historyHandler;