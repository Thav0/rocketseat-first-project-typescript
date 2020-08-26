import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: '1234',
    });

    const response = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with worng password', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: '1234',
    });

    expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
