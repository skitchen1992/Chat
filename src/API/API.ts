enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Headers = Record<string, string> & {
  "set-cookie"?: string[]
};

type Options = {
  method: METHODS;
  data?: any;
  timeout?: number
  headers?: Headers
};

type OptionsWithoutMethod = Omit<Options, 'method'>;


const queryStringify = (data: Record<string, string>) => {
  return '? ' + Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethod = {}) => {

    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };


  request = (url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
