const { Auth } = require('./facades');
const { Users } = require('./repositories');

function resourceRequestFactory(credentials = '') {
  return {
    header: {
      Authorization: `Basic ${btoa(credentials)}`,
    },
  };
}

function resourceResponseFactory(
  status,
  message,
  token,
) {
  return {
    status: status || null,
    message: message || null,
    token: token || null,
  };
}

describe('Authentication Model Facade', () => {
  let facade;

  const daniel = {
    email: 'daniel@stationfive.com',
    password: 'abc123',
  };

  beforeEach(() => {
    const users = new Users([daniel]);
    facade = new Auth(users);
  });

  test('Should successfully login', () => {
    const expected = resourceResponseFactory(200, 'Login successful', btoa(`${daniel.email}`));

    const request = resourceRequestFactory(`${daniel.email}:${daniel.password}`);

    const actual = facade.login(request);

    expect(actual).toEqual(expected);
  });

  test('Should fail login with incorrect password', () => {
    const expected = resourceResponseFactory(400, 'Email or password is invalid');

    const request = resourceRequestFactory(`${daniel.email}:123abc`);

    const actual = facade.login(request);

    expect(actual).toEqual(expected);
  });

  test('Should fail with invalid credentials', () => {
    const expected = resourceResponseFactory(400, 'Email or password is invalid');

    const request = resourceRequestFactory(`${daniel.email}:`);

    const actual = facade.login(request);

    expect(actual).toEqual(expected);
  });

  test('Should fail login with incorrect email', () => {
    const expected = resourceResponseFactory(400, 'Email or password is invalid');

    const request = resourceRequestFactory(`notdaniel@stationfive.com:${daniel.password}`);

    const actual = facade.login(request);

    expect(actual).toEqual(expected);
  });
});
