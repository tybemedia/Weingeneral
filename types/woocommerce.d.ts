declare module '@woocommerce/woocommerce-rest-api' {
  interface WooCommerceRestApiOptions {
    url: string;
    consumerKey: string;
    consumerSecret?: string;
    version?: string;
  }

  interface WooCommerceRestApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
  }

  class WooCommerceRestApi {
    constructor(options: WooCommerceRestApiOptions);
    get(endpoint: string, params?: any): Promise<WooCommerceRestApiResponse>;
    post(endpoint: string, data: any): Promise<WooCommerceRestApiResponse>;
    put(endpoint: string, data: any): Promise<WooCommerceRestApiResponse>;
    delete(endpoint: string, params?: any): Promise<WooCommerceRestApiResponse>;
  }

  export default WooCommerceRestApi;
} 