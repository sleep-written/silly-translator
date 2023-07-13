import type { SeederClass } from '../core/index.js';
import { EntityManager } from 'typeorm';

import { LanguageSeeder } from './language.seeder.js';

export const seeders: SeederClass[] = [
    LanguageSeeder,
];