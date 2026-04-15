import type { ParsedPath } from 'node:path';
import type { EnvInject } from './env.inject.js';

import { dirname, parse, resolve } from 'node:path/posix';
import { test, describe } from 'node:test';
import { Env } from './env.js';

class Inject implements EnvInject {
    #files: Record<string, Record<string, { toString(): string; }>>;

    process: EnvInject['process'];

    constructor(
        cwd: string,
        files: Record<string, Record<string, { toString(): string; }>>,
        env?: NodeJS.ProcessEnv
    ) {
        this.#files = files;
        this.process = {
            env: env ?? {},
            cwd: () => cwd
        };
    }

    dirname(path: string): string {
        return dirname(path);
    }

    parse(path: string): ParsedPath {
        return parse(path);
    }

    resolve(...p: string[]): string {
        return resolve(...p);
    }

    readFileSync(path: string, _: BufferEncoding): string {
        if (!this.#files[path]) {
            const error: any = new Error(`The file "${path}" doesn't exists`);
            error.code = 'ENOENT';
            throw error;
        }

        return Object
            .entries(this.#files[path])
            .map(([ k, v ]) => `${k} = ${v.toString()}`)
            .join('\n');
    }
}

describe(`Load text value`, () => {
    test(`Load from env file`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            {
                '/path/to/project/appconfig.env': {
                    port: 8080,
                    dist: false
                }
            }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port');
        const dist = env.get('dist');

        t.assert.strictEqual(port, '8080');
        t.assert.strictEqual(dist, 'false');
    });

    test(`Load from process.env`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            { },
            {
                port: '6666',
                dist: 'true'
            }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port');
        const dist = env.get('dist');

        t.assert.strictEqual(port, '6666');
        t.assert.strictEqual(dist, 'true');
    });

    test(`Load from env file with default values`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            { }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port', '6666');
        const dist = env.get('dist', 'true');

        t.assert.strictEqual(port, '6666');
        t.assert.strictEqual(dist, 'true');
    });
});

describe(`Load text value with parser`, () => {
    test(`Load from env file`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            {
                '/path/to/project/appconfig.env': {
                    port: 8080,
                    dist: false
                }
            }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port', v => parseInt(v));
        const dist = env.get('dist', v => v === 'true');

        t.assert.strictEqual(port, 8080);
        t.assert.strictEqual(dist, false);
    });

    test(`Load from process.env`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            { },
            {
                port: '6666',
                dist: 'true'
            }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port', v => parseInt(v));
        const dist = env.get('dist', v => v === 'true');

        t.assert.strictEqual(port, 6666);
        t.assert.strictEqual(dist, true);
    });

    test(`Load from env file with default values`, (t: test.TestContext) => {
        const inject = new Inject(
            '/path/to/project/src/tool/env',
            { }
        );

        const env = new Env('appconfig.env', inject);
        const port = env.get('port', { default: 6666, callback: v => parseInt(v) });
        const dist = env.get('dist', { default: true, callback: v => v === 'true' });

        t.assert.strictEqual(port, 6666);
        t.assert.strictEqual(dist, true);
    });
});