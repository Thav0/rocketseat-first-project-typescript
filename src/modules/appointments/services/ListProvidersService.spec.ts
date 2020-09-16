import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'johntest@example.com',
      name: 'John Test',
      password: 'teste',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'johnddd@example.com',
      name: 'John DDD',
      password: 'teste123',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'johnlogged@example.com',
      name: 'John Logged',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
