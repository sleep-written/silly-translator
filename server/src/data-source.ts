import { pathResolve } from '@bleed-believer/path-alias';
import { DataSource } from 'typeorm';
import { resolve } from 'path';

export const dataSource = new DataSource({
    type: 'sqlite',
    database: resolve('./database.sqlite'),
    entities: [
        (()  => {
            const path = pathResolve('entities/*.entity.ts');
            console.log('entities:', path);
            return path;
        })()
    ],
    migrations: [
        (()  => {
            const path = pathResolve('migrations/*.ts');
            console.log('migrations:', path);
            return path;
        })()
    ]
});