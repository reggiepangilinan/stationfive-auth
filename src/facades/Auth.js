const { ResourceResponse } = require('../models');

class AuthFacade {
  constructor(usersRepository) {
    this.userRepository = usersRepository;
  }

  login(request) {
    
    const encryptedCredentials = request.header.Authorization.split(' ')[1];
    const decryptedCredentials = atob(encryptedCredentials);
    const email = decryptedCredentials.split(':')[0];
    const password = decryptedCredentials.split(':')[1];
    
    const user = this.userRepository.findByEmailAndPassword(email,password);
    
    if(user)
      return new ResourceResponse(200,'Login successful', btoa(user.email));
      
    return new ResourceResponse(400,'Email or password is invalid', null);;
  }
}

module.exports = AuthFacade;