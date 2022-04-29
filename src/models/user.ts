import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  refreshToken: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  public async validatePassword(current: string): Promise<boolean> {
    // todo: refactor using bcrypt
    return current === this.password;
  }

  public toPresentationLayer(): NotesServer.User {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
