const predictHandlers = require('../handler/predictHandlers');
const historyHandlers = require('../handler/historyHandlers');
const routes = [
    {
        method: 'POST',
        path: '/predict',
        options: {
            payload: {
                output: 'file',
                parse: true,
                multipart: true,
            },
            validate: {
                failAction: async (request, h, err) => {
                    if (err.message.includes('Payload content length greater than maximum allowed')) {
                        return h.response({
                            status: 'fail',
                            message: 'Payload content length greater than maximum allowed: 1000000'
                        }).code(413).takeover();
                    }
                    return h.response({
                        status: 'Fail',
                        message: 'Terjadi kesalahan dalam melakukan prediksi'
                    }).code(400).takeover();
                }
            }
        },
        handler: predictHandlers,

    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: historyHandlers,
    }
];


module.exports = routes;