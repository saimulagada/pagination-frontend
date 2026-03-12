const DEV_API_URL = "http://localhost:3000";
const PROD_API_URL = "http://13.201.129.66:3000";

export const API_BASE_URL =
  import.meta.env.MODE === "development" ? DEV_API_URL : PROD_API_URL;