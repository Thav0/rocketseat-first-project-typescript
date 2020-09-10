import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfile from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfile(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Test',
      email: 'johntest@example.com',
    });

    expect(updatedUser.name).toBe('John Test');
    expect(updatedUser.email).toBe('johntest@example.com');
  });

  it('should not be able change to another user email', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@teste.com',
      name: 'John Doe',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Test',
        email: 'johndoe@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Test',
      email: 'johntest@example.com',
      old_password: 'teste',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Test',
        email: 'johntest@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Test',
        email: 'johntest@example.com',
        old_password: '11111',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
