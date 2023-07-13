import { Response } from './response';

export type FetchResponse<T> = Promise<Response<T>>;
