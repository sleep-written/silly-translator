import { EntityManager, type ObjectLiteral } from 'typeorm';

import { dataSource } from '@/data-source.js';

export class EntityWritter<T extends ObjectLiteral> {
    #pkKey: keyof T;
    #entity: { new(): T; };
    #manager: EntityManager;
    #memory!: T[];

    constructor(
        entity: { new(): T; },
        pkKey: keyof T,
        manager?: EntityManager
    ) {
        this.#pkKey = pkKey;
        this.#entity = entity;
        this.#manager = manager ?? dataSource.manager;
    }

    async initialize(): Promise<void> {
        this.#memory = await this.#manager.find(this.#entity);
    }

    async createOrUpdate(target: Partial<T>): Promise<T> {
        let entity: any = new this.#entity();
        if (target[this.#pkKey] != null) {
            const pk = target[this.#pkKey];
            const i = this.#memory.findIndex(x => {
                if (x[this.#pkKey] != null) {
                    return x[this.#pkKey] === pk;
                } else {
                    return false;
                }
            });

            if (i >= 0) {
                entity = this.#memory.splice(i, 1)[0];
            }
        }

        for (const [ key, value ] of Object.entries(target)) {
            entity[key] = value;
        }

        return this.#manager.save(entity);
    }

    async save(): Promise<void> {
        while (this.#memory.length > 0) {
            const item = this.#memory.shift();
            if (item) {
                await this.#manager.remove(item);
            }
        }
    }
}