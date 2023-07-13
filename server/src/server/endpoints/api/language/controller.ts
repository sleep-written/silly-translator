import { Language } from '@entities/language.entity.js';
import { Controller, Get } from '@bleed-believer/espresso';

export class LanguageController extends Controller {
    @Get()
    async get(): Promise<void> {
        const data = await Language.find();
        this.response.json(data);
    }
}