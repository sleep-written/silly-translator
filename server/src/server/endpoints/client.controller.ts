import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const devTools = {
    uuid: randomUUID(),
    root: resolve(
        import.meta.dirname,
        '../../../../client/src/app'
    )
};

@ControllerPath('')
export class ClientController extends Controller {
    #root = resolve(
        import.meta.dirname,
        '../../../../client/dist/client/browser'
    );

    async resolvePath(): Promise<string> {
        const path = resolve(
            this.#root,
            this.request.path.slice(1)
        );

        try {
            const resp = await stat(path);
            if (!resp.isFile()) {
                throw new Error('Invalid file');
            }

            return this.request.path;
        } catch {
            return this.request.path !== '/'
            ?   this.request.path + '/index.html'
            :   '/index.html';
        }
    }

    @Get('.well-known/appspecific/com.chrome.devtools.json')
    devTools(): void {
        this.response.json(devTools);
    }

    @Get('*all')
    @Get()
    async get(): Promise<void> {
        const path = await this.resolvePath();
        const root = this.#root;
        this.response.sendFile(path, { root });
    }
}