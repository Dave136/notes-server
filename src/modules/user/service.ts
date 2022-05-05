import bcrypt from 'bcrypt';
import AppDataSource from '../../../ormconfig';
import User from './entity';
import { UserAlreadyExists } from './error';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export interface IUserService {
  findAll(): Promise<NotesServer.User[]>;
  create(dto: CreateUserDTO): Promise<NotesServer.User>;
  findByEmail(email: string): Promise<NotesServer.User | null>;
}

export default class UserService implements IUserService {
  private async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async findAll(): Promise<NotesServer.User[]> {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find();
  }

  async create(dto: CreateUserDTO): Promise<NotesServer.User> {
    const userRepository = AppDataSource.getRepository(User);

    const existentUser = await this.findByEmail(dto.email);

    if (existentUser) {
      throw new UserAlreadyExists(dto.email);
    }

    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.password = await this.encryptPassword(dto.password);

    const created = await userRepository.save(user);

    return created;
  }

  async findByEmail(email: string): Promise<NotesServer.User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return null;

    return user;
  }
}
