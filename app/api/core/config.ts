export const LOCAL_API_ENDPOINT = "http://localhost:8000/";

export const PROD_API_ENDPOINT =
  process.env.NEXT_APP_PROD_API_ENDPOINT || LOCAL_API_ENDPOINT;
