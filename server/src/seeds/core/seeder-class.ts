import { EntityManager } from 'typeorm';

export interface SeederClass {
    name: string;
    new(manager: EntityManager): {
        start(): Promise<void>;
    }
};