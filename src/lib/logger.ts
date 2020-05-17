import pino from 'pino';

export default pino({
    prettyPrint: process.env.NODE_ENV === 'local' && {
        colorize: true,
        translateTime: true,
    },
});
