const { Auth } = require('./facades');
const { Users,Tokens } = require('./repositories');
const { TokenService } = require('./services');

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
    const tokenService = new TokenService();
    const tokens = new Tokens(['token1','token2','token3']);
    facade = new Auth(users,tokenService, tokens);
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



describe('Token Repository', () => {
  let tokens;

  beforeEach(() => {
    tokens = new Tokens(['token1','token2','token3']);    
  });

  test('Should not save duplicate token', () => {
    const expected = false;
    const actual = tokens.save('token1')
    expect(actual).toEqual(expected);
  });


  test('Should save unique token', () => {
    const expected = true;
    const actual = tokens.save('token4')
    expect(actual).toEqual(expected);
  });
});
