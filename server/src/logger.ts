import { Logger } from 'tslog';

export const logger = new Logger({
    name: 'silly-translator',
    prettyLogTemplate: 
            `{{name}} -> {{logLevelName}} `
        +   `[{{hh}}:{{MM}}:{{ss}}.{{ms}}]: `
});

export function separator(): void {
    console.log(''.padEnd(65, '-'));
}