import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a User', async () => {
    const user = await createUser.execute({
      email: 'teste@teste.com',
      name: 'gustavo',
      password: '1234',
    });

    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('password');
    expect(user.email).toBe('teste@teste.com');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      email: 'teste@teste.com',
      name: 'gustavo',
      password: '1234',
    });

    await expect(
      createUser.execute({
        email: 'teste@teste.com',
        name: 'gustavo',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
