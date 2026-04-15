import { CommandRouting } from '@bleed-believer/commander';

import { ServerCommand } from './server/command.js';

@CommandRouting({
    commands: [
        ServerCommand,
    ]
})
export class AppRouting {}