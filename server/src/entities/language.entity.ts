import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Language' })
export class Language extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'varchar', length: 4 })
    cod!: string;

    @Column({ type: 'varchar', length: 128 })
    description!: string;
}