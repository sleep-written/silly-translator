import { Meta } from './meta';

export interface Response<T = any> {
    data: T;
    meta: Meta;
}
