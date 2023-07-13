import type { AppconfigStruct } from './appconfig.struct.js';

import { access, readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import { relative, resolve } from 'path';

export class Appconfig {
    static load(): Promise<AppconfigStruct> {
        const obj = new Appconfig('./appconfig.yml');
        return obj.load();
    }

    static save(data: AppconfigStruct): Promise<void> {
        const obj = new Appconfig('./appconfig.yml');
        return obj.save(data);
    } 

    #path: string;
    get path(): string {
        return this.#path;
    }

    constructor(path: string) {
        this.#path = resolve(path);
    }

    async exists(): Promise<boolean> {
        try {
            await access(this.#path);
            return true;
        } catch {
            return false;
        }
    }

    async load(): Promise<AppconfigStruct> {
        if (!await this.exists()) {
            const path = relative(process.cwd(), this.#path);
            throw new Error(`El archivo "${path}" no existe.`);
        }

        const text = await readFile(this.#path, 'utf-8');
        return parse(text);
    }

    async save(data: AppconfigStruct): Promise<void> {
        const text = stringify(data);
        return writeFile(this.#path, text);
    }
}