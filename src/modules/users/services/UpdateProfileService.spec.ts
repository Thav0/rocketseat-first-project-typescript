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
});
