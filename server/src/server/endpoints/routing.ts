import { ControllerRouting } from '@bleed-believer/espresso';

import { AngularController } from './angular.controller.js';
import { APIRouting } from './api/controller.js';

@ControllerRouting({
    routes: [
        APIRouting,
    ],
    controllers: [
        AngularController
    ]
})
export class EndpointsRouting {}