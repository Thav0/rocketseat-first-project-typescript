import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}

export default ShowProfileService;
