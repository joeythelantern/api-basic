import http from 'http';
import express from 'express';
import './config/logging';

import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';

export const application = express();
export let server: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    server = http.createServer(application);
    server.listen(1337, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${JSON.stringify(server.address())}`);
        logging.log('----------------------------------------');
    });
};

export const Shutdown = (callback: any) => server && server.close(callback);

Main();
