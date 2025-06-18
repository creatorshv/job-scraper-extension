const path = "http://localhost:8000/api/parse-data";

async function apiClient(data) {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ data }),
    });

    return response.ok
      ? "Data has been added."
      : "Failed to add data. Try again later!";
  } catch (error) {
    console.error("API Error:", error.message);
    return "Something went wrong";
  }
}

export default apiClient;
