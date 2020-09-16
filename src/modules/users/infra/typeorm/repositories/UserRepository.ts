import { getRepository, Repository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

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

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users = await this.ormRepository.find();

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    }

    return users;
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
