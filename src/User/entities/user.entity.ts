import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRol {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({
    type: 'enum',
    enum: UserRol,
    default: UserRol.CLIENT,
  })
  rol: UserRol;
}
