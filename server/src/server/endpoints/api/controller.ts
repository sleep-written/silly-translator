import { ControllerRouting } from '@bleed-believer/espresso';

import { TranslateController } from './translate/controller.js';
import { LanguageController } from './language/controller.js';

@ControllerRouting({
    path: 'api',
    controllers: [
        TranslateController,
        LanguageController,
    ]
})
export class APIRouting {}