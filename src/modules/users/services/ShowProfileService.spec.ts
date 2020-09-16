import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johntest@example.com',
      name: 'John Test',
      password: 'teste',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Test');
    expect(profile.email).toBe('johntest@example.com');
  });

  it('should not be able to show the profile from non-existing user id', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
