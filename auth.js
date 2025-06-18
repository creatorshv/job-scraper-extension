import { authenticateUser } from "./apiClient.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error");

// Redirect to extract.html if token is still valid
chrome.storage.local.get("token", (result) => {
  const token = result.token;
  if (token && token.value && Date.now() - token.createdAt < 30 * 60 * 1000) {
    window.location.href = "extract.html";
  }
});

// Form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorMessage.textContent = "Please enter both email and password.";
    return;
  }

  const result = await authenticateUser({
    email,
    password,
    accessFrom: "extension",
  });

  const tokenData = {
    value: result.data.token,
    createdAt: Date.now(),
  };

  chrome.storage.local.set({ token: tokenData }, () => {
    window.location.href = "extract.html";
  });
});
