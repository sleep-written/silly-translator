import { CommandRouting } from '@bleed-believer/commander';

import { SetupCommand } from './setup/command.js';
import { SeedsCommand } from './seeds/command.js';
import { ServerCommand } from './server/command.js';

@CommandRouting({
    commands: [
        SetupCommand,
        SeedsCommand,
        ServerCommand,
    ]
})
export class AppRouting {}