import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'file_name', type: 'varchar', length: 100, default: '0' })
    fileName: string;

    @Column({ name: 'file_type', type: 'varchar', length: 100, default: '0' })
    fileType: string;

    @Column({ name: 'file_size', type: 'varchar', length: 100, default: '0' })
    fileSize: string;

    @Column({ name: 'category', type: 'varchar', length: 100, default: '0' })
    category: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}