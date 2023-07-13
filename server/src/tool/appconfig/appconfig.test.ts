import test from 'ava';

import { Appconfig } from './appconfig.js';
import { rm } from 'fs/promises';

const target = new Appconfig('./appconfig.test.yml');
test.after(_ => rm(target.path));

test.serial('Guardar configuración', async t => {
    await target.save({
        port: 8080,
        query: 'div.result-container',
        client: '../client/build/client'
    });

    t.pass();
});

test.serial('Cargar configuración', async t => {
    const data = await target.load();
    t.deepEqual(data, {
        port: 8080,
        query: 'div.result-container',
        client: '../client/build/client'
    });
});

