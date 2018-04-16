class Tokens {
    constructor(tokens = []) {
        this.tokens = tokens;
    }
    save(token) {
        if (token && this.tokens.indexOf(token) < 0) {
            this.tokens.push(token);
            //Not necessary - Just easier to see the output when running tests.            
            console.log(`Token Repository Content [${this.tokens}]`);
            return true;            
        }
        return false;
    }
}
module.exports = Tokens;