interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  status: string;
  [key: string]: any;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  [key: string]: any;
}

export const useWooCommerce = () => {
  const config = useRuntimeConfig();

  const baseUrl = 'https://weingeneral.de/weingeneral/wp-json/wc/v3';
  const consumerKey = 'ck_f569f9d15352cd965f14e58d00cfde131e628a93';
  const consumerSecret = 'cs_bd541bb1dda1dce7e1baa7d3832ca42e412dc1b4';

  const makeRequest = async (endpoint: string, params: Record<string, any> = {}) => {
    const searchParams = new URLSearchParams({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      ...params
    });

    const url = `${baseUrl}/${endpoint}?${searchParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching WooCommerce API: ${response.status}`);
    }
    return response.json();
  };

  const getProducts = async (params?: any) => {
    return makeRequest('products', params);
  };

  const getProduct = async (id: number) => {
    return makeRequest(`products/${id}`);
  };

  const getCategories = async () => {
    return makeRequest('products/categories');
  };

  const getProductsByCategory = async (categoryId: number, params?: any) => {
    return makeRequest('products', {
      category: categoryId.toString(),
      ...params
    });
  };

  return {
    getProducts,
    getProduct,
    getCategories,
    getProductsByCategory
  };
};
