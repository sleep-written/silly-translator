import { InjectionToken } from '@angular/core';
import { Headers } from './interfaces';

export const HTTP_HEADERS = new InjectionToken<Partial<Headers>>('http-headers');
