import { pathResolve } from '@bleed-believer/path-alias';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'sqlite',
    database: resolve('./database.sqlite'),
    entities: [
        pathResolve('entities/*.entity.ts')
    ],
    migrations: [
        pathResolve('migrations/*.ts')
    ]
});