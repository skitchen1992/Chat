export enum Method {
  Get = "Get",
  Post = "Post",
  Put = "Put",
  Patch = "Patch",
  Delete = "Delete"
}

export type Headers = Record<string, string> & {
  "set-cookie"?: string[]
};

type Options = {
  method: Method;
  data?: any;
  timeout?: number
  headers?: Headers
};

type OptionsWithoutMethod = Omit<Options, "method">;

const queryStringify = (data: Record<string, string>) => {
  return "? " + Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = "/", options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, { ...options, method: Method.Get }, options.timeout);
  }

  public post<Response = void>(path: string, data?: unknown, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
        method: Method.Post,
        data
      }, options.timeout
    );
  }

  public put<Response = void>(path: string, data: unknown, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
        method: Method.Put,
        data
      }, options.timeout
    );
  }

  public patch<Response = void>(path: string, data: unknown, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
        method: Method.Patch,
        data
      }, options.timeout
    );
  }

  public delete<Response>(path: string, data?: unknown, options: OptionsWithoutMethod = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
        method: Method.Delete,
        data
      }, options.timeout
    );
  }

  private request<Response>(url: string, options: Options = { method: Method.Get }, timeout = 5000): Promise<Response> {
    const { headers = { "Content-Type": "application/json" }, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.Get;
      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url
      );

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
