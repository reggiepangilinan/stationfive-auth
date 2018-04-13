# Coding Test
The coding test aims to test applicant's understanding of JavaScript as well as their ability to follow diagrams and test suites with minimal supervision. The test must be completed in vanilla JavaScript using either Object Oriented Programming or Functional Programming but not a combination of both. The goal is to see the applicants familiarity with design patterns, the 'this' keyword and programming concepts in general. The test goes through an "everyday like" scenario, where a user needs to log in. The applicant is given a facade, diagrams, a test suite and a spec sheet to complete the task. All tests must pass for the application to be reviewed.

## Use case
A user is trying to log in to an application which uses token based authentication. All credentials are base64 encoded strings of user email, :, and password e.g. "daniel@fake.com:abc123". The action must validate the data passed to it, create a token, save it to the repository and return a success response. If the login data is not valid or the user is not found the application must respond with an error. The controller must get the credentials from the "Authorization" header as a Basic token. There is no database all data is stored in memory.

## The project and limitations
The project uses Jest to run the test suite and assertions. The project must run on node version 8.9.4. No libraries can be used (including transpilers). The test must be completed using vanilla JavaScript. You are not to change the test suite, your implementation must pass the tests provided. You are not to change the facade interface.

## Expectations
We are looking for developers who can follow patterns already set out in the existing source code. The developer must be able to read and follow diagrams as well as write implementations for tests written by other developers. Although test driven development is encouraged in our everyday work, for this test the quality of the implementation is the main focus.

**Hints**:
- Reduce code duplication.
- Make sure your solution is simple and easy to read.
- Favour self documenting code.
- Make use of 'this' and binding, it is important that we see you understand 'this'.

"# stationfive-auth" 
