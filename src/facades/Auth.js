const { ResourceResponse, LoginDto } = require('../models');

class AuthFacade {
  
  // Added dependency tokenService and tokenRepository
  // We don't want the facade to be responsible for creating these dependencies. To avoid tight coupling. So ideally it should be passed by a DI Container.
  // Not really sure if this is a good practice in the NodeJs backend world, But in the OO world like java or C# this is very common.
  constructor(usersRepository, tokenService, tokenRepository) {
    this.userRepository = usersRepository;
    this.tokenService = tokenService;
    this.tokenRepository = tokenRepository;
  }

  login(request) {
    
    const encryptedCredentials = request.header.Authorization.split(' ')[1];
    const decryptedCredentials = atob(encryptedCredentials);
    const email = decryptedCredentials.split(':')[0];
    const password = decryptedCredentials.split(':')[1];
    
    const user = this.userRepository.findByEmailAndPassword(email,password);
    
    if(user)
    {
      //Create a user token      
      const token = this.tokenService.createUserToken(new LoginDto(user.email,user.password));

      //Save token to repository
      const tokenSaved = this.tokenRepository.save(token);
      return new ResourceResponse(200,'Login successful', token);
    }
           
    return new ResourceResponse(400,'Email or password is invalid', null);;
  }
}

module.exports = AuthFacade;