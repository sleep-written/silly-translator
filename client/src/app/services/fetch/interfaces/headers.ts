/**
 * Headers to be put into the HTTP request.
 */
 export interface Headers {
    [key: string]: string;

    'Access-Control-Allow-Origin': string;
    'Content-Type': string;
    // 'Set-Cookie': string;
}
