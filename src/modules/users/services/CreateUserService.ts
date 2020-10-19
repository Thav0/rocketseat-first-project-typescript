import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used by another user', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list:*');

    return user;
  }
}

export default CreateUserService;
