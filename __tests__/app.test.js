const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


const thisUser = {
  email: 'user@user.com',
  password: '1234',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? thisUser.password;
  const agent = request.agent(app);
  const thisUser = await UserService.create({ ...thisUser, ...userProps });
  const { email } = thisUser;
  await agent.post('/api/v1/secrets').send({ email, password });
  return [agent, thisUser];
};

describe('secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#POST logs in a user', async () => {
    const res = await request(app).post('/api/v1/users/sessions').send(thisUser);
    const { email } = thisUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('returns the current user', async () => {
    const [agent, thisUser] = await registerAndLogin();
    const me = await agent.get('/api/v1/users/sessions');

    expect(me.body).toEqual({
      ...thisUser,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
