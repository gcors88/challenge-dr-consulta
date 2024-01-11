import { ErrorMessages } from '@/commons/enums/error-messages';

export const getErrorName = (errorMessage: ErrorMessages): string =>
  Object.keys(ErrorMessages).find((key) => ErrorMessages[key] === errorMessage);
