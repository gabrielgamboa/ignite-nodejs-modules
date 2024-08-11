export class LateCheckInValidationError extends Error {
  constructor() {
    super("The Checkin can only be validated until 20 minutos of its creation");
  }
}
