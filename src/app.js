const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes')
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            payload: {
                maxBytes: 1000000,
                parse: true,
                multipart: true
            }
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server running on : ${server.info.uri}`);
    
}

init ();