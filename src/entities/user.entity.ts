import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    email: string;

    @Column({ nullable: true, length: 100 })
    password: string;

    @Column({ nullable: true, length: 100 })
    first_name: string;


    @Column({ nullable: true, length: 100 })
    last_name: string;

    @Column({ nullable: true, length: 100 })
    confirmPassword: string;


    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

}