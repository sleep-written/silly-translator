import { All, Controller, ControllerPath } from '@bleed-believer/espresso';
import { resolve } from 'path';

import { ServerError } from '@server/core/index.js';
import { Appconfig } from '@tool/appconfig/appconfig.js';

@ControllerPath('*')
export class AngularController extends Controller {
    #path!: string;

    @All()
    async all(): Promise<void> {
        if (
            (this.request.method !== 'GET') ||
            (this.request.headers['content-type']?.match(/json/gi))
        ) {
            throw new ServerError(404, 'El recurso solicitado no existe.');
        }
        
        // Read file configuration
        if (typeof this.#path !== 'string') {
            const conf = await Appconfig.load();
            this.#path = resolve(conf.client);
        }

        // Return the frontend
        this.response.sendFile('/', { root: this.#path });
    }
}