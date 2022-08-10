const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
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
  it('returns a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(thisUser);
    const { email } = thisUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('it should sign in user', async () => {
    await request(app).post('/api/v1/users').send(thisUser);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: thisUser.email,
      password: thisUser.password,
    });

    expect(res.body).toEqual({ message: 'Signed in successfully!' });
  });

  afterAll(() => {
    pool.end();
  });
});
