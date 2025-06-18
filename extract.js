import { parseData } from "./apiClient.js";

const extractBtn = document.getElementById("extractBtn");
const logoutBtn = document.getElementById("logoutBtn");
const resultDisplay = document.getElementById("result");

// Redirect to login if token is missing or expired
chrome.storage.local.get("token", (stored) => {
  const token = stored.token;

  if (!token || !token.value || Date.now() - token.createdAt > 30 * 60 * 1000) {
    chrome.storage.local.remove("token", () => {
      window.location.href = "auth.html";
    });
    return;
  }

  // Auto-clear token on expiration
  const expiresIn = 30 * 60 * 1000 - (Date.now() - token.createdAt);
  setTimeout(() => {
    chrome.storage.local.remove("token");
  }, expiresIn);
});

// Logout handler
logoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove("token", () => {
    window.location.href = "auth.html";
  });
});

// Extract button logic
extractBtn.addEventListener("click", async () => {
  resultDisplay.textContent = "";

  // Get active LinkedIn tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url.includes("linkedin.com/jobs")) {
    resultDisplay.textContent =
      "Please open a LinkedIn job page before extracting.";
    return;
  }

  // Inject script to grab job details
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const container = document.querySelector(
          ".jobs-semantic-search-job-details-wrapper"
        );
        return container?.innerText.trim() || null;
      },
    },
    async (injectionResults) => {
      if (chrome.runtime.lastError) {
        resultDisplay.textContent =
          "Script injection failed: " + chrome.runtime.lastError.message;
        return;
      }

      const rawText = injectionResults?.[0]?.result;

      if (!rawText) {
        resultDisplay.textContent = "Job details not found or empty.";
        return;
      }

      resultDisplay.textContent = "Sending to backend...";
      extractBtn.disabled = true;

      try {
        const response = await parseData(rawText);
        resultDisplay.textContent = response.message || "Done.";
      } catch (error) {
        resultDisplay.textContent = "Unexpected error occurred.";
      } finally {
        extractBtn.disabled = false;
      }
    }
  );
});
