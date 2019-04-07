export class ResponseError {
  readonly success: boolean = false;
  constructor(public error: string) {}
}

export class ResponseSuccess<T> {
  readonly success: boolean = true;
  constructor(public data: T) {}
}

export type EndpointResponse<T> = ResponseError | ResponseSuccess<T>;
