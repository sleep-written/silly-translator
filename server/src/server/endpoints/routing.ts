import { ControllerRouting } from '@bleed-believer/espresso';

import { ClientController } from './client.controller.js';
import { APIRouting } from './api/controller.js';

@ControllerRouting({
    routes: [
        APIRouting,
    ],
    controllers: [
        ClientController
    ]
})
export class EndpointsRouting {}