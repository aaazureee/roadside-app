export class InvalidCredentialError extends Error {
  constructor(message = 'Invalid credential') {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AccountBannedError extends Error {
  constructor(message = 'Account banned') {
    super(message);
    this.name = this.constructor.name;
  }
}
