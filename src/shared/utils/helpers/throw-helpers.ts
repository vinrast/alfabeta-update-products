import {
  BadRequestErrorHandler,
  DatabaseErrorHandler,
  EnumBadRequestType,
  NotFoundErrorHandler,
  ServiceUnavailableErrorHandler,
} from '../error-handlers';

export function throwInvalidParamError(message: string) {
  throw new BadRequestErrorHandler(message, EnumBadRequestType.Invalid);
}

export function throwMissingParamError(message: string) {
  throw new BadRequestErrorHandler(message, EnumBadRequestType.Missing);
}

export function throwConnectionError(message: string) {
  throw new ServiceUnavailableErrorHandler(message);
}

export function throwNotFoundError(message: string) {
  throw new NotFoundErrorHandler(message);
}

export function throwDatabaseError(message: string) {
  throw new DatabaseErrorHandler(message);
}
