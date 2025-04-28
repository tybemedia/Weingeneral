declare module '#app' {
  interface RuntimeConfig {

      woocommerce: {
        url: string;
        consumerKey: string;
        consumerSecret: string;
      }
  }
}

export {} 