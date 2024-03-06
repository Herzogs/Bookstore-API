import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn({ type: 'varchar', length: 13 })
  isbn: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 100 })
  editorial: string;

  @Column({ type: 'int', width: 4 })
  anioPublicacion: number;

  @Column({ type: 'float', precision: 2, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'varchar', length: 100 })
  pathImage: string;
}
