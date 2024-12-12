// Failure
export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    // assim que chamar a função isLeft, o objeto irá ser do tipo Left, tendo o tipo de value alterado para L
    return true;
  }

  isRight(): this is Right<L, R> {
    // assim que chamar a função isLeft, o objeto irá ser do tipo Right, tendo o tipo de value alterado para R
    return false;
  }
}

// Success
export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
