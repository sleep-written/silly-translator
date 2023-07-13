import { Controller, Get } from '@bleed-believer/espresso';
import { Auditor } from 'audit-var';
import { parse } from 'node-html-parser';
import { In } from 'typeorm';

import { ServerError } from '@server/core/server-error.js';
import { Appconfig } from '@tool/appconfig/index.js';
import { Language } from '@entities/language.entity.js';

export class TranslateController extends Controller {
    #auditor = new Auditor({
        type: 'object',
        keys: {
            from: { type: 'string' },
            to:   { type: 'string' },
            q:    { type: 'string' }
        }
    })

    @Get()
    async get(): Promise<void> {
        const { from, to, q } = await this.#getQueryArgs();
        const html = await this.#getHtml(from, to, q);
        const resp = await this.#getResponse(html);

        if (this.request.query?.json != null) {
            this.response.json({
                data: {
                    from, to,
                    input: q,
                    output:resp
                }
            });
        } else {
            this.response.contentType('text/plain');
            this.response.end(resp);
        }
    }

    async #getQueryArgs(): Promise<{ from: string; to: string; q: string; }> {
        try {
            const { from, to, q } = this.#auditor.audit(this.request.query);
            const count = await Language.countBy({ cod: In([ from, to ]) });
            if (
                (from !== to && count !== 2) ||
                (from === to && count !== 1)
            ) {
                throw new Error();
            }

            return { from, to, q };
        } catch {
            throw new ServerError(
                400,
                    'The parameters "from", "to" and "q" must be a valid value, '
                +   'and the values for "from" and "to" must be valid language codes'
            );
        }
    }

    async #getHtml(from: string, to: string, q: string): Promise<string> {
        const base = 'https://translate.google.com/m?'
            +   `hl=${from}&sl=${from}`
            +   `&tl=${to}&ie=UTF-8&prev=_m`
            +   `&q=${encodeURIComponent(q)}`;
            
        const res = await fetch(base);
        return res.text();
    }

    async #getResponse(html: string): Promise<string> {
        const conf = await Appconfig.load();
        const dom = parse(html);
        const obj = dom.querySelector(conf.query);
        if (!obj) {
            throw new Error('The translated text isn\'t found in the google response');
        }

        return obj.innerText;
    }
}