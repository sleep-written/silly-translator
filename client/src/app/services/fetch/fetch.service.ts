import { Inject, Injectable, Optional } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Response, Headers } from './interfaces';
import { HTTP_HEADERS } from './http-headers';
import { FetchError } from './fetch-error';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private _headers: Headers;

  /**
   * Gets or sets the headers of all requests made by this instance.
   */
  get headers(): Headers {
    return this._headers;
  }
  set headers(v: Headers) {
    this._headers = v;
  }

  constructor(
    private _routerServ: Router,
    private _httpClient: HttpClient,
    @Inject(HTTP_HEADERS) @Optional() headers: Headers,
  ) {
    if (headers) {
      this._headers = headers;
    } else {
      this._headers = {
        'Content-Type': 'application/vnd.api+json; charset=utf-8',
        'Access-Control-Allow-Origin': location.origin,
        // 'Set-Cookie': 'HttpOnly; Secure; SameSite=Strict'
      };
    }
  }

  /**
   * Returns a parsed error form a catch block, and redirect to "/"
   * in case of the http error code is 401 or 403.
   * @param err error instance given by the catch expression.
   */
  private catchError(err: any): FetchError {
    const obj = new FetchError(err);
    switch (obj.status) {
      case 401:
      case 403:
        if (this._routerServ.url.toLowerCase() !== '/usuario/login') {
          this._routerServ.navigate([ '' ]);
        }
    }
    return obj;
  }

  /**
   * Checks if the current url its absolute or relative. If its relative,
   * adds at the beginning the location of the current page.
   * @param url raw url of the request.
   */
  private parseUrl(url: string): string {
    if (!url.match(/https?:\/\//gi)) {
      url = location.origin + '/' + url;
    }

    return url;
  }

  /**
   * HTTP Request del tipo "GET". Se utiliza para solicitar un recurso al servidor.
   * @param url URL del recurso que se solicita.
   */
  public async get<T = any>(url: string): Promise<Response<T>> {
    try {
      const obs = this._httpClient.get<Response<T>>(
        this.parseUrl(url),
        { headers: this._headers }
      );

      const res = await lastValueFrom(obs);
      return res;
    } catch (err: any) {
      throw this.catchError(err);
    }
  }

  /**
   * HTTP Request del tipo "POST". Se utiliza para crear o agregar un recurso al servidor.
   * @param url URL del recurso que se va a agregar.
   * @param data Datos del recurso a crear/insertar.
   */
  public async post<T = any>(url: string, data?: any): Promise<Response<T>> {
    try {
      const obs = this._httpClient.post<Response<T>>(
        this.parseUrl(url),
        data ? JSON.stringify(data) : null,
        { headers: this._headers }
      );

      const res = await lastValueFrom(obs);
      return res;
    } catch (err: any) {
      throw this.catchError(err);
    }
  }

  /**
   * HTTP Request del tipo "PUT". se utiliza para actualizar completamente los datos de un recurso existente en
   * el servidor. Sí permite la inserción de nuevos recursos.
   * @param url URL del recurso que se va a modificar.
   * @param data Datos del recurso a modificar.
   */
  public async put<T = any>(url: string, data?: any): Promise<Response<T>> {
    try {
      const obs = this._httpClient.put<Response<T>>(
        this.parseUrl(url),
        data ? JSON.stringify(data) : null,
        { headers: this._headers }
      );

      const res = await lastValueFrom(obs);
      return res;
    } catch (err: any) {
      throw this.catchError(err);
    }
  }


  /**
   * HTTP Request del tipo "PATCH". se utiliza para actualizar de forma parcial los datos de un recurso existente
   * en el servidor (por ejemplo solo cambiar uno o 2 campos de una entidad). No permite la inserción de nuevos
   * recursos.
   * @param url URL del recurso que se va a modificar.
   * @param data Datos del recurso a modificar.
   */
  public async patch<T = any>(url: string, data?: any): Promise<Response<T>> {
    try {
      const obs = this._httpClient.patch<Response<T>>(
        this.parseUrl(url),
        data ? JSON.stringify(data) : null,
        { headers: this._headers }
      );

      const res = await lastValueFrom(obs);
      return res;
    } catch (err: any) {
      throw this.catchError(err);
    }
  }

  /**
   * HTTP Request del tipo "DELETE". Se utiliza para eliminar un recurso al servidor.
   * @param url URL del recurso a eliminar.
   */
  public async delete<T = any>(url: string): Promise<Response<T>> {
    try {
      const obs = this._httpClient.delete<Response<T>>(
        this.parseUrl(url),
        { headers: this._headers }
      );

      const res = await lastValueFrom(obs);
      return res;
    } catch (err: any) {
      throw this.catchError(err);
    }
  }
}
