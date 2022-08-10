const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const thisUser = {
  email: 'user@user.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? thisUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...thisUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET secrets should return secrets for auth users', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
