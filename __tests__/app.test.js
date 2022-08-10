const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? thisUser.password;
  const agent = request.agent(app);
  const newUser = await UserService.create({ ...thisUser, ...userProps });
  const { email } = newUser;
  return [agent, newUser];
};

const thisUser = {
  email: 'user@user.com',
  password: '123456',
};

describe('secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('returns a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(thisUser);
    const { email } = thisUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it.skip('it should sign in user', async () => {
    await request(app).post('/api/v1/users').send(thisUser);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: thisUser.email,
      password: thisUser.password,
    });

    expect(res.body).toEqual({ message: 'Signed in successfully!' });
  });

  it.skip('DELETE a users sessions', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.status).toBe(204);
  });

 
  afterAll(() => {
    pool.end();
  });
});
