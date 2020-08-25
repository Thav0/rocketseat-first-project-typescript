import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByID(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserByID = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findUserByID || undefined;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.save(user);

    return user;
  }
}

export default UserRepository;
