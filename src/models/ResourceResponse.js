class ResourceResponse {
    constructor(status, message,token) {
        this.status = status;
        this.message = message;
        this.token = token;        
    }
}
module.exports = ResourceResponse;