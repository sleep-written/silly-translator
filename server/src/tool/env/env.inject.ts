import type { ParsedPath } from 'node:path';

export interface EnvInject {
    readFileSync?(path: string, encoding: BufferEncoding): string;
    dirname?(path: string): string;
    resolve?(...p: string[]): string;
    parse?(path: string): ParsedPath;

    process?: {
        env: NodeJS.ProcessEnv;
        cwd(): string;
    }
}