import { HTTPError } from './interfaces';

export class FetchError extends Error {
    private pStatus: number;
    public get status(): number {
        return this.pStatus;
    }

    private pTitle: string;
    public get title(): string {
        return this.pTitle;
    }

    public constructor(input: any) {
        const fail = input.error?.error as HTTPError;
        super();

        if (fail) {
            this.pStatus = fail.status;
            this.pTitle = fail.title;
            this.message = fail.detail;
        } else {
            this.pStatus = 500;
            this.pTitle = 'Internal Server Error';
            this.message = 'El servidor no responde, contacte al departamento de informática';
        }
    }
}
