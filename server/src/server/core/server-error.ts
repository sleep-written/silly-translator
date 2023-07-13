import { statusCode } from './status-code.js';

export class ServerError extends Error {
    #title: string;
    get title(): string {
        return this.#title;
    }

    #statusCode: number;
    get statusCode(): number {
        return this.#statusCode;
    }

    constructor(code: number, message?: string) {
        super(message);

        if (
            (code < 200 || code >= 600) &&
            (statusCode[code] != null)
        ) {
            this.#statusCode = code;
        } else {
            this.#statusCode = 500;
        }

        this.#title = statusCode[this.#statusCode];
    }
}