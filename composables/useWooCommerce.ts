import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

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
  
  const api = new WooCommerceRestApi({
    url: 'https://weingeneral.de/weingeneral',
    consumerKey: 'ck_f569f9d15352cd965f14e58d00cfde131e628a93',
    consumerSecret: 'cs_bd541bb1dda1dce7e1baa7d3832ca42e412dc1b4',
    version: 'wc/v3'
  });

  const getProducts = async (params?: any) => {
    try {
      const response = await api.get('products', params);
      return response.data as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  const getProduct = async (id: number) => {
    try {
      const response = await api.get(`products/${id}`);
      return response.data as Product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get('products/categories');
      return response.data as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  const getProductsByCategory = async (categoryId: number, params?: any) => {
    try {
      const response = await api.get('products', {
        category: categoryId,
        ...params
      });
      return response.data as Product[];
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  };

  return {
    getProducts,
    getProduct,
    getCategories,
    getProductsByCategory
  };
}; 