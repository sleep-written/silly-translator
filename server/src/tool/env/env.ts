import type { EnvInject } from './env.inject.js';

import { dirname, parse, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

export class Env {
    #injected: Required<EnvInject>;
    #filename: string;

    constructor(filename?: string, inject?: EnvInject) {
        this.#filename = filename ?? '.env';
        this.#injected = {
            readFileSync:   inject?.readFileSync?.bind(inject)  ?? readFileSync,
            dirname:        inject?.dirname?.bind(inject)   ?? dirname,
            resolve:        inject?.resolve?.bind(inject)   ?? resolve,
            parse:          inject?.parse?.bind(inject)     ?? parse,

            process:        inject?.process ?? process
        };
    }

    get(name: string): string | undefined;
    get(name: string, defaultValue: string): string;
    get<T>(name: string, callback: (v: string) => T): T | undefined;
    get<T>(name: string, options: { default: T; callback: (v: string) => T; }): T;
    get(
        name: string,
        opts?: string | ((v: string) => unknown) | {
            default: unknown;
            callback: (v: string) => unknown;
        }
    ): unknown {
        let defaultValue: any;
        if (typeof opts === 'object') {
            defaultValue = opts.default;
        } else if (typeof opts === 'string') {
            defaultValue = opts;
        }

        let callback: ((v: string) => unknown) | undefined;
        if (typeof opts === 'object') {
            callback = opts.callback;
        } else if (typeof opts === 'function') {
            callback = opts;
        }

        let path = this.#injected.process.cwd();
        let value: unknown;

        do {
            try {
                const envPath = this.#injected.resolve(path, this.#filename);
                const envText = this.#injected.readFileSync(envPath, 'utf-8');
                const envData = parseEnv(envText);
                if (typeof envData[name] === 'string') {
                    value = envData[name];
                    break;
                }

            } catch (err: any) {
                if (err?.code !== 'ENOENT') {
                    throw err;
                }
            }
            
            path = this.#injected.dirname(path);
        } while (this.#injected.parse(path).root !== path);

        if (typeof value === 'undefined') {
            value = this.#injected.process.env[name];
        }

        if (typeof value === 'string') {
            if (typeof callback === 'function') {
                return callback(value);
            }
        }

        return value ?? defaultValue;
    }
}