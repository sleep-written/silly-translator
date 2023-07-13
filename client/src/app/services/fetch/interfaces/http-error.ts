import { Meta } from './meta';

export interface HTTPError {
    status: number;
    title: string;
    detail: string;
}
