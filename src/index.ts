import app from './app';
import logger from './lib/logger';

const port = process.env.HTTP_PORT ?? 8080;

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});
