const baseURL = "http://localhost:8000/api";

async function parseData(payload) {
  try {
    const tokenData = await new Promise((resolve) => {
      chrome.storage.local.get("token", resolve);
    });

    const token = tokenData?.token?.value;
    if (!token) {
      return { ok: false, message: "No valid token found." };
    }

    const response = await fetch(`${baseURL}/parse-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: payload }),
    });

    if (!response.ok) {
      return { ok: false, message: "Failed to add data. Try again later!" };
    }

    return { ok: true, message: "Data has been added." };
  } catch (error) {
    console.error("API Error:", error.message);
    return { ok: false, message: "Something went wrong." };
  }
}

async function authenticateUser(credentials) {
  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ data: credentials }),
    });

    if (!response.ok) {
      return { ok: false, message: "Invalid server response." };
    }

    const result = await response.json();
    if (result?.status !== "success" || !result.token) {
      return { ok: false, message: "Incorrect login credentials." };
    }

    return { ok: true, message: "Login successful.", data: result };
  } catch (error) {
    console.error("Auth Error:", error.message);
    return { ok: false, message: "Failed to authenticate user." };
  }
}

export { parseData, authenticateUser };
