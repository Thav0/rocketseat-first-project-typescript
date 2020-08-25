import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';

describe('CreateUser', () => {
  it('should be able to create a User', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

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
    const fakeUsersRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      email: 'teste@teste.com',
      name: 'gustavo',
      password: '1234',
    });

    expect(
      createUser.execute({
        email: 'teste@teste.com',
        name: 'gustavo',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
