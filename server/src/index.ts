import { Commander } from '@bleed-believer/commander';

import { logger, separator } from './logger.js';
import { AppRouting } from './app.routing.js';

try {
    console.clear();
    console.log('>> silly-translator');
    separator();

    const app = new Commander(AppRouting);
    await app.execute();
} catch (err: any) {
    logger.error(err.message);
}