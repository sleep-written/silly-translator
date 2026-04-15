import { Env } from '@tool/env/index.js';

export class Environment {
    #env = new Env('environment.env');

    get selector(): string {
        return this.#env.get(
            'SILLY_TRANSLATOR_SELECTOR',
            'div.result-container'
        );
    }

    get port(): number {
        return this.#env.get('SILLY_TRANSLATOR_PORT', {
            callback: v => parseInt(v),
            default: 8080
        });
    }
}