const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mockModelPredict = require('../services/mockModelPredict');
const { savePredictionToFirestore } = require('../services/firestoreService');

const predictHandlers = async (request, h) => {
    try {
        const file = request.payload.image;
        if (!file) {
            return h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi'
            }).code(400);
        }

        const filePath = path.join(__dirname, '../uploads', `${uuidv4()}-${file.hapi.filename}`);
        const fileStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
            file.pipe(fileStream);
            file.on('end', resolve);
            file.on('error', reject);

        });

        const prediction = await mockModelPredict(filePath);
        fs.unlinkSync(filePath)

        const resultId = uuidv4();
        const createdAt = new Date().toISOString();
        const responseData = {
            id: resultId,
            result: prediction,
            suggestion: prediction === 'cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
            createdAt
        };

        await savePredictionToFirestore(responseData);

        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: responseData,
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(400);
        
    }
};

module.exports = predictHandlers;