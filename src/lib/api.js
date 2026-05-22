const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

async function apiClient(
  endpoint,
  method = "GET",
  body = null,
  token = null,
  customHeaders = {}
) {
  const isFormData = body instanceof FormData;

  const headers = {
    ...( !isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const config = {
    method,
    headers,
    ...(body && {
      body: isFormData
        ? body
        : JSON.stringify(body),
    }),
  };

  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      config
    );

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export default apiClient;