// Konfigurasi dasar domain API Anda
const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

async function apiClient(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }), // Tambahkan token jika ada
  };

  const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw data; // Melempar error agar bisa ditangkap di halaman
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export default apiClient;