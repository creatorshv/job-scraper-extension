const path = "http://localhost:8000/api/parse-data";

async function apiClient(data) {
  console.log(JSON.stringify(data));
  try {
    const result = await fetch(path, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ data }),
    });
    const final =
      result.status == "200"
        ? "Data has been added."
        : "Failed to add data. Try again!";
    return final;
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
}

export default apiClient;
