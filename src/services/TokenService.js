class TokenService {
  constructor() {   
  }
  createUserToken(loginDto)
  {
    const token = btoa(loginDto.email);
    //Not necessary - Just easier to see the output when running tests.
    console.log('Created Token ' + token)
    return token;
  }
}

module.exports = TokenService;